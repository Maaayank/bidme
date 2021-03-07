module.exports = {

    getWalletBalance: async (db, uid) => {

        const users = db.collection('users')
        const user = await users.findOne(
            {
                uid: uid
            }, {
            projection: {
                wallet: 1,
                username: 1,
                uid: 1
            }
        })

        return user
    },

    updateWalletBalance: async (db, uid, bid, session = null) => {

        const users = db.collection('users')
        users.updateOne({
            uid: uid
        }, {
            $inc: {
                wallet: bid
            }
        },{
            session: session
        })
    }
}