var router = require('express').Router()

const dbClient = require('../../database').client
const services = require('../../database').services
const socket = require('../../socket')
const validateBid = require('../../middlewares').validateBid
const bidPossible = require('../../middlewares').bidPossible

router.post('bid', validateBid, bidPossible, (req, res) => {
    const err = new Error()
    try {

        bid = req.body.bid
        pid = req.body.pid
        uid = req.decoded.id

        const client = dbClient.getClient()
        const db = dbClient.get()
        const tid = Math.floor(Math.random() * 99745 + Math.random() * 5434)

        const session = client.startSession();

        const transactionOptions = {
            readPreference: 'primary',
            readConcern: { level: 'local' },
            writeConcern: { w: 'majority' }
        };

        const transactionresults = await session.withTransaction(async () => {

            const user = services.getWalletBalance(db, uid, session)

            if (user != null && user.wallet >= bid) {
                const bidded = await services.getUsersBiddedAmount(db, pid, uid, session)
                await services.placeBid(db, bid + bidded, pid, session)
                await services.addtransaction(db, bid, pid, tid, session)
                await services.updateWalletBalance(db, uid, bid * -1, session)

            } else {
                session.abortTransaction();
            }
        }, transactionOptions)

        if (transactionresults) {

            const user = service.getWalletBalance(db, uid)

            res.status(200).json({
                wallet: user.wallet,
                tid: tid,
                msg: `Bid successful`
            })

            services.getBids(db, pid).then((res) => {

                socket.emit(String(pid), res)

            }).catch((e) => {

                console.log(e)
            })

        } else {
            throw err
        }

    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            msg: "something went wrong"
        })
    }
})

module.exports = router