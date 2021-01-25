module.exports = {

    dedtokenFindOne: async (db, token) => {
        const ded = db.collection('dedtoken')
        ded.findOne(
            {
                token: token
            },
            {
                projection: { _id: 0 }
            }
        ).then((res) => {

            if (res == null) {
                return {
                    exists: false
                }
            } else {
                return {
                    exists: true
                }
            }
        })
    },


    dedTokenUpdateOne: async (db, token) => {
        const ded = db.collection('dedtoken')
        ded.updateOne(
            {
                token: token
            },
            {
                $setOnInsert: {
                    token: token
                }
            },
            {
                upsert: true
            }
        ).then((res) => {
            return {
                insert: true
            }
        })
    },

    checkIfUserExists: async (db, email) => {

        const users = db.collection('users')
        var result = await users.findOne({ email: email }, { projection: { uid: 1, email: 1 } })

        if (result == null) {
            return {
                exists: false
            }
        } else {
            return {
                exixts: true,
            }
        }
    },

    getUser: async (db, email) => {

        const users = db.collection('users')
        var results = await users.findOne({ email: email }, { projection: { uid: 1, email: 1, pass: 1, username: 1 } })

        if (results == null) {
            var e = new Error()
            e.message = `User doesn't exist`
            e.code = 401
            throw e
        } else {
            return results
        }
    },

    newUser: async (db, uid, email, pass, username, phone) => {
        const users = db.collection('users')
        const result = await users.insertOne({
            uid: uid,
            email: email,
            pass: pass,
            username: username,
            phone: phone,
            wallet: 100
        })

        if (result != null) {
            return {
                insert: true
            }
        } else {
            return {
                insert: false
            }
        }
    }

}