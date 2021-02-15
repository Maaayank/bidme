const router = require('express').Router()
const dbClient = require('../../database').client
const dbServices = require('../../database').services
const services = require('../../services')

router.get('/', async (req, res) => {
    try {

        const err = new Error();
        const db = dbClient.get()

        if (Date.now() - require('../../config').feedsUpdatedAt > 1000 * 60 * 60) {
            services.fetchUpdates(db)
        }

        const result = await dbServices.getAllFeeds(db)
        res.status(200).json({
            feeds: result.feeds,
            message: "feeds fetched !!"
        })

    } catch (err) {
        console.log(err.message)
        if (err.status == 401) {
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