const express = require("express")
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require("body-parser")
const apiRouter = require('./routers/apiRouters.js')
const userRouter = require('./routers/userRouters.js')
const userActionsRouter = require('./routers/userActionsRouters.js')

dotenv.config()

const PORT = process.env.PORT 

const app = express()

app.use(cors())

app.use(bodyParser.json())

app.use('/api', apiRouter)
app.use('/user', userRouter)
app.use('/action', userActionsRouter)

app.listen(PORT, () => {
    console.log('Connected on Port ' + PORT)
})