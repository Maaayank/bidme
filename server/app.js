const database = require('./database').client
const express = require('express')
const bodyParser = require('body-parser');
const logger = require('morgan');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const PORT = require('./config').development.port
const logs = require('./config').logs
const firebase = require('./firebase')

require('dotenv').config()

const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(cors({
    origin: true,
    credentials: true
}))

app.use(cookieParser())
app.use(bodyParser.json())

if (process.env.NODE_ENV != 'production') {
    app.use(logger(logs.level))
}

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        msg: "home page"
    })
})

app.use('/api', require('./api'))

app.use((req, res) => {
    res.status(404).json({
        success: false,
        msg: `page not found`
    })
})

database.connect().then((str) => {
    firebase.initializeApp()
    app.listen(PORT, () => {
        console.log(`🛡️  Server listening on port: ${PORT}`)
    })
}).catch((e) => {
    console.error(e)
})