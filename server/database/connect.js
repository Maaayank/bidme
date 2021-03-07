var MongoClient = require('mongodb').MongoClient
var keys = require('../config').database

var db = null
var mClient = null

module.exports = {
	connect: () => {
		return new Promise((resolve, reject) => {
			MongoClient.connect(keys.uri, {
				useNewUrlParser: true,
				useUnifiedTopology: true
			}, (err, client) => {
				if (err) {
					reject(err);
				} else {
					mClient = client
					db = client.db("bidme")

					if (db == null) {
						reject("null")
					}
					resolve(`Database Connected !!`)
				}
			})
		})
	},

	get: () => {
		return db
	},

	getClient: () => {
		return mClient
	},

	close: async (client) => {
		client.close()
		return true
	}
}