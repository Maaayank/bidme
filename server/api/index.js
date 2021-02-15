const router = require('express').Router()
const validateToken = require('../middlewares').validateToken

router.use('/auth', require('./auth'));
router.use('/user', validateToken,  require('./user'))
router.use('/feed', require('./feed'))

module.exports = router