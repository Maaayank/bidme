module.exports = {

    placeBid: async (db, amount, pid, session) => {

        const products = db.collection('products')
        await products.updateOne(
            {
                pid: pid,
                startsAt: { $lt: Date.now() },
                endsAt: { $gt: Date.now() },
                auctionAmount: { $lt: amount }
            },
            {
                $set: {
                    auctionAmount: amount
                }
            },
            {
                session: session
            }
        )
    },

    addTransaction: async (db, bid, pid, tid, session) => {

        const transactions = db.collection('transactions')
        const result = await transactions.insertOne(
            {
                tid: tid,
                pid: pid,
                bid: bid,
                timestamp: Date.now()
            },
            {
                session: session
            }
        )
    },

    getUsersBiddedAmount(db, pid, uid, session = null) {

        const transactions = db.collection('transactions')
        const result = await transactions.aggregate([
            {
                $match: {
                    pid: pid,
                    uid: uid,
                }
            },
            {
                $group: {
                    uid: $uid,
                    pid: $pid,
                    bidded: { $sum: $bid }
                }
            },
            {
                session: session
            }
        ])

        console.log(result)
        return result
    },

    getBids: async (db, pid) => {

        const transactions = db.collection('transactions')
        const result = transactions.aggregate(
            [
                {
                    $match: {
                        pid: pid
                    }
                },
                {
                    $group: {
                        uid: $uid,
                        bid: { $sum: $bid },
                        timestamp: { $max: $timestamp }
                    }
                }
            ]
        )

        console.log(result)
        return result
    }
}