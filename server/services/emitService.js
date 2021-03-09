const dbServices = require('../database').services
const socket = require('../socket')

module.exports = {

    emitAuctionUpdate: async (pid, db) => {

        const bids = await dbServices.getBids(db, pid)
        const stat = await dbServices.getStat(db, pid)

        socket.emit(String(pid), { bids: bids, stat: stat })
    }
}