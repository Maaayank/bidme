const { sanitizeBody, check, body } = require("express-validator");

module.exports = [
    sanitizeBody(),
    check('email')
        .exists()
        .withMessage('Email Address Required')
        .trim()
        .notEmpty()
        .withMessage('Email Address Required')
        .isString()
        .isEmail()
        .withMessage('Invalid Email Address'),
    check('pass')
        .exists()
        .trim()
        .notEmpty()
        .withMessage('Password Required')
        .isString()
        .withMessage('Invalid Password')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
        .withMessage('Invalid Password'),
    check('username')
        .exists()
        .withMessage('Username Required')
        .trim()
        .notEmpty()
        .withMessage('Username Required')
        .isString()
        .withMessage('Invalid Username format Required'),
    check('phone')
        .if(body('phone').exists())
        .trim()
        .notEmpty()
        .withMessage('phone number not provided')
        .isMobilePhone()
        .withMessage('invalid phone number')
]