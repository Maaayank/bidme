module.exports = {
    validateToken: require('./validatetoken'),
    bidPossible: require('./bidCheck'),
    decodeToken: require('./decodeToken'),
    ...require('./expressvalidators')
}