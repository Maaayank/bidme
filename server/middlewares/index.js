module.exports = {
    validateToken: require('./validatetoken'),
    bidPossible: require('./bidCheck'),
    ...require('./expressvalidators')
}