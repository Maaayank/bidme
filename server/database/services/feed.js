module.exports = {

    getAllFeeds: async (db) => {

        const feed = db.collection('feeds')
        const result = await feed.find({}, { projection: { _id: 0 } }).limit(20).toArray()

        if (result) {
            return {
                feeds: result
            }
        } else {
            return {
                feeds: []
            }
        }
    },

    updateFeeds: async (db, items) => {

        // const feeds = db.collection('feeds')
        // const result = await feeds.deleteMany({})
        // if (result != null) {
        //     require('../../config').feedsUpdatedAt = Date.now()
        //     feeds.insertMany(items)
        // }
    },

}