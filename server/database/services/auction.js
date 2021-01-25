module.exports = {


    placeBid: async (db, amount, pid, uid, transaction_id) => {

        const products = db.collection('products')
        const result = await products.updateOne(
            {
                pid: pid,
                bidStartsAt: { $lt: Date.now() },
                bidEndsAt: { $gt: Date.now() },
                maxBid: { $lt: amount }
            },
            {
                $push: {
                    maxBid: amount,
                    participants: {
                        tid: transaction_id,
                        uid: uid,
                        amount: amount,
                        timestamp: Date.now()
                    }
                }
            }
        )
    },

    // getAllPrevBidsAmount : async (db, pid, uid) => {

    //     const products = db.collection('products')
    //     const result = await products
    // }
}