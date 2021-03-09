var router = require('express').Router()
const { validateToken, validateNewProduct, decodeToken } = require('../../middlewares')

const dbService = require('../../database').services
const client = require('../../database').client
const socket = require('../../socket')

const { validationResult } = require('express-validator');

router.post('/new', validateToken, validateNewProduct, async (req, res) => {

    try {

        const e = new Error()
        var errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors)
            errors = errors.errors
            e.code = 400
            e.message = errors[errors.length - 1].msg
            throw e
        }

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

router.get('/:pid/info', decodeToken, async (req, res) => {
    try {

        const pid = Number(req.params.pid)
        const err = new Error()
        const db = client.get()
        const uid = req.decoded ? req.decoded.id : -1

        const result = await dbService.getProductDetails(db, pid)
        const bids = await dbService.getBids(db, pid)

        const bidded = await dbService.getUsersBiddedAmount(db, pid, uid)

        result.prevBid = bidded
        res.status(200).json({
            success: true,
            product: result,
            bids: bids
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
        const err = new Error()
        const page = Number(req.params.page)
        const db = client.get()
        const result = await dbService.fetchProducts(db, page)

        if (!result.nomore) {
            res.status(200).json({
                success: true,
                products: result.data
            })
        } else {
            err.code = 400
            err.message = "no more products"
            throw err
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