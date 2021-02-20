module.exports = {

    fetchProducts: async (db, page) => {
        const products = db.collection('products')
        const result = await products.find({ bidEndsAt: { $gt: Date.now() } }).sort({ bidEndsAt: -1 }).skip(page * 10).limit(10).toArray()

        if (result == null) {
            return {
                nomore: true
            }
        } else {
            return {
                nomore: false,
                data: await result.toArray()
            }
        }
    },

    getProductDetails: async (db, pid) => {
        const products = db.collection('products')
        const result = await products.findOne({ pid: pid }, { projection: { _id: 0 } })

        if (result == null) {
            let e = new Error()
            e.message = `Product doesn't exist`
            e.code = `401`
            throw e
        } else {
            return result
        }
    },

    newProduct: async (db, details) => {
        const products = db.collection('products')
        const result = await products.insertOne(details)

        if(result == null){
            let e = new Error()
            e.message = `Something went wrong !`
            e.code = `404`
            throw e
        }
    }
}