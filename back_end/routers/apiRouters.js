const express = require('express')
const dotenv = require('dotenv')
const axios = require('axios')
const expressAsyncHandler = require('express-async-handler')

const apiRouter = express.Router()

const API_BASE = 'https://api.igdb.com/v4'

dotenv.config()

// config to axios
function reqConfig(query, authorization) {

    console.log(query)

    return {

        method: 'POST',
        url: `${API_BASE}/games`,
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
        console.log(res.data)
        return { expires_in: res.data.expires_in, access_token: res.data.access_token }

    }

    return { access_token: authorization.slice(7, authorization.length) }

}

// route to fetch all queries made from client
apiRouter.post('/data', expressAsyncHandler(async (req, res) => {

    try {

        const authorization = await checkTokenIsValid(req.headers.authorization)

        console.log(authorization)

        if (!req.body.query) {

            return res.status(500).json({
                success: false,
                message: 'Não tem query nesse request.'
            })

        }

        let response = {};

        await axios(reqConfig(
            req.body.query,
            `Bearer ${authorization.access_token}`
        )).then(res =>
            response = res.data
        )

        return res.status(200).json({
            success: true,
            result: response,
            token: req.headers.authorization ? null : authorization
        })

    }
    catch (error) {

        return res.status(500).json({ success: false, message: `${error}` })

    }

}))

module.exports = apiRouter