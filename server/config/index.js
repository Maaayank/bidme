require('dotenv').config()

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {

    development: {
        port: parseInt(process.env.PORT, 10) || 5000,
    },

    jwt: {
        jwt_secret: process.env.JWT_SECRET,
        salting_rounds: parseInt(process.env.SALTING_ROUNDS, 10),

    },

    database: {
        uri: process.env.MONGODB_URI,
    },


    logs: {
        level: process.env.LOG_LEVEL || 'dev',
    },

    gsignin: {
        client_id: process.env.CLIENT_ID || ''
    },

    feedsUpdatedAt: 0,

    serviceAccountKey: {
        type: "service_account",
        project_id: "bidme-d3362",
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n') || '',
        client_email: "firebase-adminsdk-qt01j@bidme-d3362.iam.gserviceaccount.com",
        client_id: "100149295494208600077",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qt01j%40bidme-d3362.iam.gserviceaccount.com"
      }
};