const express = require('express')
const dotenv = require('dotenv')
const expressAsyncHandler = require('express-async-handler')
const { connect } = require('mongoose')
const bcrypt = require('bcrypt')
const User  = require('../models/userModel.js')
const { newToken } = require('../utils.js')
const { logInThroughToken } = require('../utils.js')

const userRouter = express.Router()

dotenv.config()

connect(process.env.MONGODB_URL, {}).then(

    console.log('MongoDB Online!!!')

)

const saltRounds = 8;

userRouter.post('/signup', expressAsyncHandler(async (req, res) => {

    try {

        const userExist = await User.findOne({ email: req.body.user.email })

        if (userExist) {
            return res.status(409).json({
                success: false,
                message: 'Usuário Já Cadastrado Previamente.',
                status: 409
            })
        }

        req.body.user.password = await bcrypt.hash(req.body.user.password, saltRounds)

        const newUser = new User(req.body.user)

        newUser.save()

        return res.status(201).json({
            success: true,
            message: 'Usuário Criado com Sucesso.',
            token: newToken(newUser.id)
        })

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: `${err.message}`,
            status: 500
        })
    }

}))

userRouter.post('/login', logInThroughToken, expressAsyncHandler(async (req, res) => {

    try {

        // If user was already logged, the function receives his token and returns his data
        if (req.body.id) {

            const user = await User.findById(
                req.body.id,
                '-password -createdAt -birthDate -_id -__v'
            )

            if (!user) {

                return res.status(404).json({
                    success: false,
                    message: 'Token contem uma ID incorreta.',
                    status: 404
                })

            }

            return res.status(200).json({
                success: true,
                message: 'Login Feito com Sucesso.',
                status: 200,
                user: user
            })

        }

        const user = await User.findOne({ email: req.body.email })


        if (!user) {

            return res.status(404).json({
                success: false,
                message: 'Email ou Senha Incorretos ou Usuário Não Cadastrado. Por favor, tente novamente.',
                status: 404
            })

        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password)

        if (!passwordMatch) {

            return res.status(404).json({
                success: false,
                message: 'Email ou Senha Incorretos ou Usuário Não Cadastrado. Por favor, tente novamente.',
                status: 404
            })

        }

        return res.status(200).json({
            success: true,
            message: 'Login Feito com Sucesso.',
            token: newToken(user.id)
        })

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: `${err.message}`,
            status: 500
        })
    }

}))

module.exports = userRouter