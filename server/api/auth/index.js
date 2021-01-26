var router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const dbClient = require('../../database').client
const services = require('../../database').services

const jwt_secret = require('../../config').jwt.jwt_secret
const salting = require('../../config').jwt.salting_rounds
const CLIENT_ID = require('../../config').gsignin.client_id

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);


var validateEmail = (eAdd) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(eAdd);
}

router.post('/signup', async (req, res) => {

    try {

        const db = dbClient.get()
        var e = new Error()

        const email = req.body.email
        const pass = req.body.pass
        const phone = req.body.phone
        const username = req.body.username

        if (email == null || pass == null || username == null) {
            e.message = `all fields required `
            e.code = 401
            throw e
        }

        if (!validateEmail(email)) {
            e.message = `incorrect email address ${email}`
            e.code = 401
            throw e
        }

        const hash_pass = await bcrypt.hash(pass, salting)
        const uid = Math.floor(Math.random() * 99745 + Math.random() * 5434)

        const result_check = await services.checkIfUserExists(db, email)

        if (!result_check.exists) {
            const result = await services.newUser(db, uid, email, hash_pass, username, phone, null)

            if (result.insert) {
                res.status(200).json({
                    success: true,
                    msg: `Welcome ${username}, login to continue`
                })
            } else {
                throw e
            }
        } else {
            e.message = `user already exists`
            e.code = 401
            throw e
        }

    } catch (e) {
        if (e.code == 401) {
            res.status(e.code).json({
                msg: e.message,
                success: false
            })
        } else {
            console.log(e.message)
            res.status(500).json({
                msg: `Somethng went wrong, try again later`,
                success: false
            })
        }
    }
});


router.post('/login', async (req, res) => {
    try {

        var e = new Error()

        const db = dbClient.get()
        const email = req.body.email
        const pass = req.body.pass

        if (email == null || pass == null) {
            e.message = `fields required`
            e.code = 401
            throw e
        }

        if (!validateEmail(email)) {
            e.message = `incorrect email address ${email}`
            e.code = 401
            throw e
        }

        const result = await services.getUser(db, email)

        if (result.pass) {
            const match = await bcrypt.compare(pass, result.pass)


            if (match) {

                const payload = {
                    id: result.id
                }

                const options = { expiresIn: '10d', issuer: 'bidme' }
                jwt.sign(payload, jwt_secret, options, (err, token) => {

                    if (err) {
                        e.message = `Error while generating token`
                        e.code = 401
                        throw e
                    }

                    res.status(200).cookie('token', token, {
                        expires: new Date(Date.now() + 1000 * 10 * 24 * 60 * 60),
                        secure: true,
                        httpOnly: true
                    }).json({
                        sucess: true,
                        msg: `Welcome ${result.username}`
                    })
                })
            } else {
                e.message = `Invalid Credentials`
                e.code = 400
                throw e
            }
        } else {
            e.message = `Try Google Sign In`
            e.code = 400
            throw e
        }


    } catch (err) {
        console.log(err)
        if (err.code == 301 || err.code == 401 || err.code == 400) {
            res.status(err.code).json({
                success: false,
                msg: err.message
            })
        } else {
            console.log(err)
            res.status(500).json({
                success: false,
                msg: `Something went wrong !`
            })
        }
    }
});

router.post('/gsignin', async (req, res) => {

    try {
        const token = req.body.token;
        const db = dbClient.get()

        if (token) {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID,
            });

            const payload = ticket.getPayload();

            if (payload.email_verified) {
                const username = payload.name
                const email = payload.email
                const sub = payload.sub

                console.log(`user verified ${username} , ${email}, ${token}`)
                const uid = Math.floor(Math.random() * 99745 + Math.random() * 5434)

                const result_check = await services.checkIfUserExists(db, email)

                if (result_check.exists) {

                    if (result_check.sub == sub) {

                        const payload = {
                            id: result_check.uid
                        }

                        const options = { expiresIn: '10d', issuer: 'bidme' }
                        jwt.sign(payload, jwt_secret, options, (err, token) => {

                            if (err) {
                                err.message = `Error while generating token`
                                err.code = 401
                                throw err
                            }

                            res.status(200).cookie('token', token, {
                                expires: new Date(Date.now() + 1000 * 10 * 24 * 60 * 60),
                                secure: true,
                                httpOnly: true
                            }).json({
                                sucess: true,
                                msg: `Welcome ${username}`
                            })
                        })

                    } else {
                        throw new Error()
                    }
                } else {
                    const result = await services.newUser(db, uid, email, null, username, null, sub)
                    if (result.insert) {

                        const payload = {
                            id: result.uid
                        }

                        const options = { expiresIn: '10d', issuer: 'bidme' }
                        jwt.sign(payload, jwt_secret, options, (err, token) => {

                            if (err) {
                                err.message = `Error while generating token`
                                err.code = 401
                                throw err
                            }

                            res.status(200).cookie('token', token, {
                                expires: new Date(Date.now() + 1000 * 10 * 24 * 60 * 60),
                                secure: true,
                                httpOnly: true
                            }).json({
                                sucess: true,
                                msg: `Welcome ${username}`
                            })
                        })
                    } else {
                        throw new Error()
                    }
                }

            } else {
                throw new Error()
            }

        } else {
            throw new Error();
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            msg: `Something went wrong !`
        })
    }
});

router.get('/logout', async (req, res) => {

    try {

        const token = req.cookies.token || ''
        const db = dbClient.get()
        var e = new Error()

        if (token == '') {
            e.message = 'login first'
            e.code = 300
            throw e
        }

        const res = await services.dedTokenUpdateOne(db, token)

        if (res.insert) {
            res.clearCookie('token').status(200).json({
                msg: 'logged out successfully',
                success: true
            })
        } else {
            e.code = 500
            e.message = `Something went wrong`
            throw e
        }

    } catch (err) {
        if (err.code == 300 || err.code == 500) {
            res.status(err.code).json({
                success: false,
                msg: err.message
            })
        } else {
            res.status(500).json({
                success: false,
                msg: `Something went wrong`
            })
        }
    }
});

module.exports = router