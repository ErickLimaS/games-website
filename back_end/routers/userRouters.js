const express = require('express')
const dotenv = require('dotenv')
const expressAsyncHandler = require('express-async-handler')
const { connect } = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/userModel.js')
const newToken = require('../utils.js')

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
                message: 'User Already Registered'
            })
        }

        req.body.user.password = await bcrypt.hash(req.body.user.password, saltRounds)

        const newUser = new User(req.body.user)

        newUser.save()

        return res.status(202).json({
            success: true,
            message: 'User Created Successfully',
            token: newToken(newUser.id)
        })

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: `${err}`
        })
    }

}))

userRouter.post('/login', expressAsyncHandler(async (req, res) => {

    try {

        const user = await User.findOne({ email: req.body.email })

        if (!user) {

            return res.status(404).json({
                success: false,
                message: 'Incorrect Email or Password or User Not Registered'
            })

        }

        const passwordMatch = bcrypt.compare(req.body.password, user.password)

        if (!passwordMatch) {

            return res.status(404).json({
                success: false,
                message: 'Incorrect Email or Password or User Not Registered'
            })

        }

        return res.status(200).json({
            success: true,
            message: 'Logged in Successlfully',
            token: newToken(user.id)
        })
        
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: `${err}`
        })
    }

}))

module.exports = userRouter