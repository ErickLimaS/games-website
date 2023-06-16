const express = require('express')
const dotenv = require('dotenv')
const axios = require('axios')
const expressAsyncHandler = require('express-async-handler')
const hltb = require('howlongtobeat')

const apiRouter = express.Router()

const API_BASE = 'https://api.igdb.com/v4'
const STEAM_GAMES_API = 'https://api.steampowered.com/ISteamApps/GetAppList/v0002/'
const STEAM_GAME_BY_ID_API = 'https://store.steampowered.com/api/appdetails?filters=price_overview&appids='

dotenv.config()

// config to axios
function reqConfig(query, authorization, alternativeRoute) {

    return {

        method: 'POST',
        url: `${API_BASE}${alternativeRoute ? alternativeRoute : '/games'}`,
        headers:
        {
            'Authorization': authorization,
            'Client-ID': `${process.env.CLIENT_ID}`,
            'Accept': 'application/json',
        },
        data: query

    }

}

// if no token was sent from client, it request a new one from API then returns to client
async function checkTokenIsValid(authorization) {

    if (!authorization) {

        const res = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`)

        return { expires_in: res.data.expires_in, access_token: res.data.access_token }

    }

    return { access_token: authorization.slice(7, authorization.length) }

}

// route to fetch all queries made from client
apiRouter.post('/data', expressAsyncHandler(async (req, res) => {

    try {

        const authorization = await checkTokenIsValid(req.headers.authorization)

        if (!req.body.query) {

            return res.status(406).json({
                success: false,
                message: 'No query was found on request.'
            })

        }

        let response = {};

        await axios(reqConfig(req.body.query, `Bearer ${authorization.access_token}`, req.body.route))
            .then(res =>
                response = res.data
            )

        /*
            If true, gets how how long the requested game 
            takes to be finished from site howlongtobeat.com.
            Search through steam game list than returns game price.
        */
        if (req.body.hltbData == true) {

            let steamID;

            // gets game list from steam
            await axios({ url: STEAM_GAMES_API, method: "GET" }).then(
              ({ data }) => {
                steamID = data.applist.apps.find(
                  (item) => item.name == response[0].name
                )?.appid;
              }
            );

            // if game ID was found, sets game price on response
            if (steamID) {
              response[0].steamId = steamID;

              await axios({
                url: `${STEAM_GAME_BY_ID_API}${steamID}`,
                method: "GET",
              }).then(({ data }) => {
                if (data[`${steamID}`].data) {
                  response[0].price = {};
                  response[0].price.steam =
                    data[`${steamID}`]?.data.price_overview;
                }
              });
            }

            // CURRENTLY NOT WORKING!!! SEEMS LIKE A PROBLEM ON API
            let hltbService = new hltb.HowLongToBeatService();

            let gameRequested;

            // search game on HLTB
            try {
                await hltbService.search(response[0].name).then((res) =>
                    res.length > 0 &&(gameRequested = res.find((item) =>
                        item.name === response[0].name || item.similarity == 1
                    ))
                );
            } catch {
                return res.status(200).json({
                success: true,
                result: response,
                token: req.headers.authorization ? null : authorization,
                });
            }

            // if game was found, sets info on response
            if (gameRequested) {
                response[0].hltb = {
                main: gameRequested.gameplayMain,
                mainExtra: gameRequested.gameplayMainExtra,
                completionist: gameRequested.gameplayCompletionist,
                };
            }
          
        }

        return res.status(200).json({
            success: true,
            result: response,
            token: req.headers.authorization ? null : authorization
        })

    }
    catch (error) {

        // status and message comes from the IGDB API itself
        return res.status(error.response.data[0].status).json(
            {
                success: false,
                message: `SERVER: ${error}. API: ${error.response.data[0].title}.`
            }
        )

    }

}))

module.exports = apiRouter