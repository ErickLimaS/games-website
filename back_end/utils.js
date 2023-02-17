const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

function newToken(data) {

    const token = jwt.sign({ id: data }, process.env.JWT_SECRET, { expiresIn: "6h" })

    return token

}

function isAuth(req, res, next) {

    const authorization = req.headers.authorization

    if (!authorization) {
        return res.status(401).send({ Message: 'No Token' })
    }
    else {
        //gets token after BEARER ******
        const token = authorization.slice(7, authorization.length);

        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({ Message: 'Invalid Token' })
            }
            else {
                req.user = decode;
                next()
            }
        })
    }
}

function logInThroughToken(req, res, next) {

    const authorization = req.headers.authorization

    if (!authorization) {

        return next()

    }

    //gets token after BEARER ******
    const token = authorization.slice(7, authorization.length)

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {

        if (err) {
            next()
        }
        else {
            req.body.id = decode.id
            next()
        }

    })

}

module.exports = { newToken, isAuth, logInThroughToken }