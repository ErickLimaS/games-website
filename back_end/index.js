const express = require("express")
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const apiRouter = require('./routers/apiRouters.js')

dotenv.config()

const PORT = process.env.PORT

const app = express()

// mongoose.connect(process.env.MONGODB_URL).then(console.log('Connected!'))

app.use(cors())

app.use(bodyParser.json())

app.use('/api', apiRouter)

app.listen(PORT, () => {
    console.log('Connected on ' + PORT)
})