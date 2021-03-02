const { body, check, validationResult, sanitize, sanitizeBody } = require('express-validator');

module.exports = [
    sanitizeBody(),
    check('id')
        .exists()
        .notEmpty()
        .withMessage(`Unauthorized User`),
    check('price')
        .if(body('price').exists())
        .isString()
        .withMessage(`Wrong format for flipkart price`),
    check('productHiglight')
        .if(body('produtHiglight').exists())
        .isArray()
        .withMessage(`Wrong format for HighLight`),
    check('productFeatures')
        .if(body('productFeatures').exists())
        .notEmpty()
        .isArray()
        // .body('productFeatures.*.name').exists().isString().withMessage(`Wrong format for productFeatures`)
        // .body('productFeatures.*.value').exists().isString().withMessage(`Wrong format for productFeatures`)
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
        .isString()
        .trim()
        .withMessage(`Wrong format for Description`),
    check('auctionAmount')
        .exists()
        .isInt({min: 1})
        .withMessage(`Unacceptable Auction Amount`),
    check('startAt')
        .exists()
        .notEmpty()
        .withMessage('Field required'),
    check('endsAt')
        .exists()
        .notEmpty()
        .withMessage('Field required'),
    check('images')
        .if(body('images').exists())
        .isArray()
        .withMessage(`Wrong format for Images`),
]