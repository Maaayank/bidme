var router = require('express').Router()
const dbClient = require('../../database').client
const dbServices = require('../../database').services

router.get('/login'), (req, res) => {
    
}

router.get('/logout', (req, res) => {

    const token = req.cookies.token || ''
    const db = dbClient.get()

    if (token == '') {
        res.status(301).json({
            msg: 'login first',
            succes: false
        })
    }

    dbServices.dedTokenUpdateOne(db, token).then((res) => {

        if (res.insert) {
            res.clearCookie('token').status(200).json({
                msg: 'logged out successfully',
                success: true
            })
        } else {
            throw new Error("Insert Unsuccesfull")
        }
    }).catch((err) => {
        console.error(err)
        res.status(302).json({
            success: false,
            msg: `logout unsuccessful , retry again`
        })
    })
});

module.exports = router