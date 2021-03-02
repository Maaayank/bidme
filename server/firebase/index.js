var admin = require("firebase-admin");
var serviceAccount = require('../config').serviceAccountKey;

module.exports = {

    initializeApp: () => {
        console.log(serviceAccount)
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
          })
    }, 
    
    getAccesstoken: async (uid) => {
        return await admin.auth()
            .createCustomToken(uid)
    },
    
}