const router = require('express').Router()
const validateToken = require('../middlewares').validateToken

router.use('/auth', require('./auth'));
router.use('/user', validateToken,  require('./user'))

module.exports = router