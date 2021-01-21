const router = require('express').Router()
const validateToken = require('../middlewares').validateToken

router.use('/auth', require('./auth'))

module.exports = router