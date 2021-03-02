var router = require('express').Router()

const dbClient = require('../../database').client
const services = require('../../database').services

const  firebase  = require('../../firebase')

router.get('/profile', async (req, res) => {
    try {

        const id = req.decoded.id
        const db = dbClient.get()
        const result = await services.getProfile(db, id)

        if (result.exists) {

            console.log(result)
            const ftoken = await firebase.getAccesstoken(String(result.uid))

            res.status(200).json({
                success: true,
                uid: result.uid,
                username: result.username,
                email: result.email,
                wallet: result.wallet,
                ftoken: ftoken
            })
        }

    } catch (err) {

        if (err == 401) {
            res.status(err.code).json({
                success: false,
                msg: err.message
            })
        } else {
            console.log(err)
            res.status(500).json({
                success: false,
                msg: `Something went wrong`
            })
        }
    }
})

module.exports = router