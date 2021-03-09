const dbServices = require('../database').services
const socket = require('../socket')

module.exports = {

    emitAuctionUpdate: async (pid, db) => {

        const bids = await dbServices.getBids(db, pid)
        var auctionAmount = 0
        if(bids.length > 0)
            auctionAmount = bids[0].bid
            
        socket.emit(String(pid), { bids: bids, auctionAmount: auctionAmount })
    }
}