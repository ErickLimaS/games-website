const express = require('express')
const dotenv = require('dotenv')
const expressAsyncHandler = require('express-async-handler')
const { connect } = require('mongoose')
const User = require('../models/userModel.js')
const GamesBookmarked = require('../models/gamesBookmarkedModel.js')
const { isAuth } = require('../utils.js')

const userActionsRouter = express.Router()

dotenv.config()

connect(process.env.MONGODB_URL, {}).then(

    console.log('MongoDB Online!!!')

)

// Add game to user's bookmarks list 
userActionsRouter.put('/bookmark', isAuth, expressAsyncHandler(async (req, res) => {

    try {

        const user = await User.findById(req.body.id)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuário Não Existe.',
                status: 404
            })
        }

        switch (req.body.bookmarkThisGame) {

            case true:

                if (user.bookmarks?.find(item => item.slug === req.body.game.slug)) {

                    return res.status(405).json({
                        success: false,
                        message: 'Jogo já adicionado aos Marcados.',
                        status: 405
                    })

                }

                // iniciate bookmarks array
                if (!user.bookmarks) {
                    user.bookmarks = []
                }

                await User.findByIdAndUpdate(req.body.id, {
                    $push: {
                        bookmarks: new GamesBookmarked(req.body.game),
                    }
                })

                await user.save()

                return res.status(202).json({
                    success: true,
                    message: 'Jogo adicionado a lista de Marcados.',
                    status: 202
                })

            case false:

                if (!user.bookmarks?.find(item => item.slug === req.body.game.slug)) {

                    return res.status(405).json({
                        success: false,
                        message: 'Esse jogo já está fora da lista de Marcados.',
                        status: 405
                    })

                }

                await User.findByIdAndUpdate(req.body.id, {
                    $pull: {
                        bookmarks: {
                            slug: req.body.game.slug,
                        }
                    }
                })

                user.save()

                return res.status(202).json({
                    success: true,
                    message: 'Jogo removido da lista de Marcados.',
                    status: 202
                })


            default:

                return res.status(406).json({
                    success: false,
                    message: 'Dado de ação não está no request.',
                    status: 406
                })

        }

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: `${err.message}`,
            status: 500
        })
    }

}))


module.exports = userActionsRouter