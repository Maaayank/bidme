const dbClient = require('../database').client
const dbServices = require('../database').services

module.exports = async (req, res, next) => {
    const e = new Error()
    try {
        const uid = req.decoded.id
        const db = dbClient.get()
        const bid = Number(req.body.bid)

        const user = await dbServices.getWalletBalance(db, uid)

        if (user != null) {
            if (user.wallet < bid) {

                e.message = `not enough balance to bid ${bid} amount`
                e.code = 400
                throw e

            } else {
                next()
            }
        } else {
            e.message = `Unauthorized user`
            e.code = 400
            throw e
        }
    } catch (e) {
        res.status(401).json({
            msg: `Invalid Bid Amount`,
            success: false
        })
    }
}