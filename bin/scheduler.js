//const nodeCron = require("node-cron");
const {sendEmails} = require("../routes/menus");
// nodeCron.schedule('0 0 1 * * *', () => {
//     sendEmails().then(r=> r)
// })

sendEmails().then(r => r);
