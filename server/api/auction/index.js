var router = require('express').Router()

const dbClient = require('../../database').client
const services = require('../../database').services
const emitAuctionUpdate = require('../../services').emitAuctionUpdate
const socket = require('../../socket')
const validateBid = require('../../middlewares').validateBid
const bidPossible = require('../../middlewares').bidPossible

router.post('/bid', validateBid, bidPossible, async (req, res) => {
    const err = new Error()
    const client = dbClient.getClient()
    const db = dbClient.get()
    const session = client.startSession()

    try {

        bid = Number(req.body.bid)
        pid = Number(req.body.pid)
        uid = req.decoded.id

        const tid = Math.floor(Math.random() * 99745 + Math.random() * 5434)


        const transactionOptions = {
            readPreference: 'primary',
            readConcern: { level: 'local' },
            writeConcern: { w: 'majority' }
        };

        const transactionresults = await session.withTransaction(async () => {

            const user = await services.getWalletBalance(db, uid)

            if (user != null && user.wallet >= bid) {
                const bidded = await services.getUsersBiddedAmount(db, pid, uid)
                await services.placeBid(db, bid + bidded, pid, session)
                await services.addTransaction(db, bid, pid, tid, uid, session)
                await services.updateWalletBalance(db, uid, bid * -1, session)

            } else {
                console.log('aborting in else')
                session.abortTransaction();
            }

        }, transactionOptions)

        if (transactionresults) {

            const user = await services.getWalletBalance(db, uid)
            res.status(200).json({
                wallet: user.wallet,
                tid: tid,
                msg: `Bid successful`
            })

            emitAuctionUpdate(pid, db)
            
        } else {
            throw err
        }

    } catch (e) {
        console.log('error :', e.message)
        res.status(500).json({
            success: false,
            msg: "something went wrong"
        })
    } finally {
        await session.endSession();
    }
})

module.exports = router