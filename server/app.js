const database = require('./database').client
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser');
const logger = require('morgan');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const PORT = require('./config').development.port
const logs = require('./config').logs
const firebase = require('./firebase')
const socket = require('./socket')
const cluster = require('cluster');
const numCPUs = 2;

if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else {

    require('dotenv').config()

    const app = express()
    const server = http.Server(app)

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
        server.listen(PORT, () => {
            console.log(`🛡️  Server listening on port: ${PORT}`)
            console.log("Started : " + process.pid )
            socket.connect(server)
        })
    }).catch((e) => {
        console.error(e)
    })
}