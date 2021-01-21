module.exports = {

    dedtokenFindOne: (db, token) => {
        return new Promise((resolve, reject) => {
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
                    resolve({
                        exists: false
                    })
                } else {
                    resolve({
                        exists: true
                    })
                }

            }).catch((err) => {
                reject(err)
            })
        })
    },


    dedTokenUpdateOne: (db, token) => {
        return new Promise((resolve, reject) => {
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
                resolve({
                    insert: true
                })
            }).catch((err) => {
                reject(err)
            })
        })
    }
}