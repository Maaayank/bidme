const { check, sanitizeBody } = require('express-validator')

module.exports = [
    sanitizeBody(),
    check('bid')
        .exists()
        .notEmpty()
        .isNumeric(),
    check('pid')
        .exists()
        .notEmpty()
]