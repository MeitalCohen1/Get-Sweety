// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// const twilio = require('twilio');
// const client = twilio(
//     process.env.TWILIO_ACCOUNT_SID,
//     process.env.TWILIO_AUTH_TOKEN
// );
//
// client.messages
//     .create({
//         from:'whatsapp:+0509816598',
//         to:'whatsapp:' + process.env.MY_PHONE_NUMBER,
//         body:'Ahoy from Twilio!',
//         mediaUrl:'https://bit.ly/whatsapp-image-example'
//     })
//     .then(message => {
//         console.log(message.sid);
//     })
//     .catch(err => {
//         console.error(err)
//     })


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
