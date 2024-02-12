let nodemailer = require("nodemailer")
let aws = require("@aws-sdk/client-ses");
const REGION = "us-east-2"
const {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = require('./environment')
const ses = new aws.SESClient({
    region: REGION,
    apiVersion: "2010-12-01",
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
})

let transporter = nodemailer.createTransport({
    SES: {ses, aws},
    sendingRate: 1 // max 1 messages/second
});

module.exports = transporter;



