const { body , check, sanitizeBody } = require('express-validator')

module.exports = [
    sanitizeBody(),
    check('email')
        .exists()
        .trim()
        .notEmpty()
        .isString()
        .isEmail()
        .withMessage('Invalid Email Address'),
    check('pass')
        .exists()
        .trim()
        .notEmpty()
        .isString()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
        .withMessage('Invalid Password')
]