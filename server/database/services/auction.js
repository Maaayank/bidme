module.exports = {

    placeBid: async (db, amount, pid, session) => {

        const products = db.collection('products')
        const res = await products.updateOne(
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

        if (res == null || res.modifiedCount == 0) {
            throw new Error(`Place bid failed`)
        }
    },

    addTransaction: async (db, bid, pid, tid, uid, session) => {

        const transactions = db.collection('transactions')
        const result = await transactions.insertOne(
            {
                tid: tid,
                pid: pid,
                bid: bid,
                uid: uid,
                timestamp: Date.now()
            },
            {
                session: session
            }
        )
    },

    getUsersBiddedAmount: async (db, pid, uid) => {

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
                    _id: '$uid',
                    bidded: { $sum: '$bid' }
                }
            }
        ])

        const res = await result.toArray()
        return res.length > 0 ? res[0].bidded : 0
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
                        _id: '$uid',
                        bid: { $sum: '$bid' },
                        timestamp: { $max: '$timestamp' }
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        let: { bid_user: "$_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ['$uid', '$$bid_user']
                                    }
                                }
                            },
                            {
                                $project: { username: 1, _id: 0 }
                            }
                        ],
                        as: 'user'
                    }
                },
                {
                    $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$user", 0] }, "$$ROOT"] } }
                },
                { $project: { user: 0, _id: 0 } }
            ]
        )

        res = await result.toArray()
        return res
    }
}