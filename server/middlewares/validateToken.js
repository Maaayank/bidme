const jwtSecret = require('../config').jwt.jwt_secret
const dbClient = require('../database').client
const dbServices = require('../database').services
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    const token = req.cookies.token || ''
    const db = dbClient.get()
    const ded = db.collection('dedtokens')

    if (token) {
        const options = {
            issuer: 'bidme'
        }

        jwt.verify(token, jwtSecret, options).then((decoded) => {

            dbServices.dedtokenFindOne()
            ded.findOne(
                { token: token },
                { projection: { _id: 0 } }
            ).then((result) => {

                if (result == null) {

                    console.log(`User Authenticated`)
                    req.decoded = decoded
                    next()
                } else {
                    throw Error(`Token Expired !! -> ${token}`)
                }
            })
        }).catch((err) => {

            console.log(err)
            res.status(401).json({
                msg: `Token Expired or illegal token.`,
                success: false
            })
        })
    } else {
        res.status(401).json({
            msg: `Authentication required.`,
            success: false
        })
    }
}
