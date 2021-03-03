module.exports = {

    fetchProducts: async (db, page) => {
        const products = db.collection('products')

        const result = await products.find(
            {
                endsAt: {
                    $gt: Date.now()
                }
            },
            {
                projection: { _id: 0 }
            }
        ).sort({ endsAt: -1 })
            .skip(page * 10).limit(10)

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
        console.log(pid)
        const products = db.collection('products')
        const result = await products.findOne({ pid: pid })

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

        if (result == null) {
            let e = new Error()
            e.message = `Something went wrong !`
            e.code = `404`
            throw e
        }
    }
}