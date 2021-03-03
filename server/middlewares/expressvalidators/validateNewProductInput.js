const { body, check, sanitizeBody } = require('express-validator');

module.exports = [
    sanitizeBody(),
    check('price')
        .if(body('price').exists())
        .if(body('price').notEmpty())
        .isString()
        .withMessage(`Wrong format for flipkart price`),
    check('productHiglight')
        .if(body('produtHiglight').exists())
        .if(body('productHiglight').notEmpty())
        .isArray()
        .withMessage(`Wrong format for HighLight`),
    check('productFeatures')
        .if(body('productFeatures').exists())
        .if(body('productFeatures').notEmpty())
        .isArray()
        .withMessage(`Wrong format for Features`),
    check('productTitle')
        .exists()
        .isString()
        .trim()
        .notEmpty()
        .withMessage(`Wrong format for title`),
    check('manufacturer')
        .exists()
        .isString()
        .trim()
        .notEmpty()
        .withMessage(`Wrong format for manufacturer`),
    check('productDescription')
        .if(body('productDescription').exists())
        .if(body('productDescription').notEmpty())
        .isString()
        .trim()
        .withMessage(`Wrong format for Description`),
    check('auctionAmount')
        .exists()
        .isInt({min: 1})
        .withMessage(`Unacceptable Auction Amount`),
    check('startsAt')
        .exists()
        .isNumeric()
        .notEmpty()
        .withMessage('Field required'),
    check('endsAt')
        .exists()
        .isNumeric()
        .notEmpty()
        .withMessage('Field required'),
    check('images')
        .if(body('images').exists())
        .if(body('images').notEmpty())
        .isArray()
        .withMessage(`Wrong format for Images`),
]