const express = require("express")
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require("body-parser")
const apiRouter = require('./routers/apiRouters.js')
const userRouter = require('./routers/userRouters.js')
const userActionsRouter = require('./routers/userActionsRouters.js')

/* 
    BACK END hosted on RENDER.COM
    (very slow, once it is being used after a long period on "sleep mode")
    could take from 30sec up to 2min loading! (crazy slow)
*/

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