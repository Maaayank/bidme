var router = require('express').Router()
const { validateToken, validateNewProduct} = require('../../middlewares')

const dbService = require('../../database').services
const client = require('../../database').client

const { body, validationResult } = require('express-validator');

router.post('/new', validateToken, validateNewProduct, async (req, res) => {

    try {
        
        const db = client.get()
        const details = req.body
        const uid = req.decoded.id
        const pid = Math.floor(Math.random() * 99745 + Math.random() * 5434)

        details.pid = pid
        details.uid = uid

        await dbService.newProduct(db, details)

        res.status(200).json({
            success: true,
            msg: `Product Submitted for Auction!!`
        })

    } catch (e) {
        if (e.code == 400) {
            res.status(e.code).json({
                msg: e.message,
                success: false
            })
        } else {
            console.log(e.message)
            res.status(500).json({
                msg: `Somethng went wrong, try again later`,
                success: false
            })
        }
    }
})

router.get('/:pid/info', async (req, res) => {
    try {

        const pid = req.params.pid
        const err = new Error()
        const db = client.get()

        const result = await dbService.getProductDetails(db, pid)

        res.status(200).json({
            success: true,
            product: result
        })


    } catch (e) {
        if (e.code == 401) {
            res.status(e.code).json({
                msg: e.message,
                success: false
            })
        } else {
            console.log(e.message)
            res.status(500).json({
                msg: `Somethng went wrong, try again later`,
                success: false
            })
        }
    }
})

router.get('/:page/all', async (req, res) => {

    try {
        const page = req.params.page
        const db = client.get()
        const result = await dbService.fetchProducts(db, page)

        if (result.nomore) {
            res.status(200).json({
                success: true,
                products: result.data
            })
        } else {
            e.code = 400
            e.message = "no more products"
        }
    } catch (e) {
        if (e.code == 400) {
            res.status(e.code).json({
                msg: e.message,
                success: false
            })
        } else {
            console.log(e.message)
            res.status(500).json({
                msg: `Somethng went wrong, try again later`,
                success: false
            })
        }
    }
})

module.exports = router