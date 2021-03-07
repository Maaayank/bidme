const router = require('express').Router()
const validateToken = require('../middlewares').validateToken

router.use('/auth', require('./auth'));
router.use('/user', validateToken,  require('./user'))
router.use('/feed', require('./feed'))
router.use('/product', require('./products'))
router.use('/auction',validateToken, require('./auction'))

module.exports = router 