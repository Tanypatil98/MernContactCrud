const functions = require("firebase-functions");

var admin = require("firebase-admin");

var serviceAccount = require("./contact-graph-123-firebase-adminsdk-hki6n-ef2052fa06.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const graphql = require('./graphql');
exports.graphql = functions.https.onRequest(graphql);
