const express = require('express')
const dotenv = require('dotenv')
const axios = require('axios')
const expressAsyncHandler = require('express-async-handler')
const hltb = require('howlongtobeat')

const apiRouter = express.Router()

const API_BASE = 'https://api.igdb.com/v4'

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

        await axios(reqConfig(
            req.body.query,
            `Bearer ${authorization.access_token}`,
            req.body.route
        )).then(res =>
            response = res.data
        )

        // gets how how long the req game takes to be finished from site howlongtobeat.com
        if (req.body.hltbData == true) {

            let hltbService = new hltb.HowLongToBeatService()

            let gameRequested

            await hltbService.search(response[0].name).then(res =>
                res.length > 0 && (gameRequested = res.find(item => item.name === response[0].name))
            )
            
            if (gameRequested) {
                response[0].hltb = {
                    main: gameRequested.gameplayMain,
                    mainExtra: gameRequested.gameplayMainExtra,
                    completionist: gameRequested.gameplayCompletionist
                }
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