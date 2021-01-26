var router = require('express').Router()

const dbClient = require('../../database').client
const services = require('../../database').services

router.get('/profile', async (req, res) => {
    try {

        const id = req.decoded.id
        const db = dbClient.get()

        console.log(id)
        const result = await services.getProfile(db, id)

        if (result.exists) {
            res.status(200).json({
                success: true,
                uid: result.uid,
                username: result.username,
                email: result.email,
                wallet: result.wallet
            })
        }
    } catch (err) {

        if (err == 401) {
            res.status(err.code).json({
                success: false,
                msg: err.message
            })
        } else {
            res.status(500).json({
                success: false,
                msg: `Something went wrong`
            })
        }
    }
})

module.exports = router