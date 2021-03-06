module.exports = {

    getProfile: async (db, uid) => {

        const users = db.collection('users')
        const result = await users.findOne({ uid: uid },{ projection:{ uid: 1, username: 1, email: 1, wallet: 1 }})

        if (result != null) {
            return {
                exists: true,
                uid: result.uid,
                username: result.username,
                email: result.email,
                wallet: result.wallet
            }
        } else {
            return {
                exists: false
            }
        }
    },
}