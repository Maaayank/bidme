var router = require('express').Router()

const dbClient = require('../../database').client
const services = require('../../database').services
const socket = require('../../socket')
const { body } = require('express-validator')

router.post('bid', body('') ,(req,res)=>{

    bid = req.body.bid
})
module.exports = router 