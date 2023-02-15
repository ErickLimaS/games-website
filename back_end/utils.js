const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

function newToken(data) {

    const token = jwt.sign(data, process.env.JWT_SECRET, { expires_in: '6h' })

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

        jwt.verify(

            token, process.env.SECRET, (err, decode) => {

                if (err) {
                    return res.status(401).send({ Message: 'Invalid Token' })
                }
                else {
                    req.user = decode;
                    next()
                }

            }

        )
    }
}

module.exports = newToken