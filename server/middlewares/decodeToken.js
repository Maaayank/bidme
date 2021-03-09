const jwtSecret = require('../config').jwt.jwt_secret
const dbClient = require('../database').client
const dbServices = require('../database').services
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {

    try {

        const token = req.cookies.token || ''

        console.log(token)
        const db = dbClient.get()

        if (token != '') {
            const options = {
                issuer: 'bidme'
            }

            const decoded = await jwt.verify(token, jwtSecret, options)
            const result = await dbServices.dedtokenFindOne(db, token)

            if (!result.exists) {
                req.decoded = decoded
                console.log(`Token Decoded`)
                next()
            } else {
                throw new Error(`Token Expired !! -> ${token}`)
            }
        }else{
            throw new Error()
        }

    } catch (err) {
        next()
    }
}
