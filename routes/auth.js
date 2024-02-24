const express = require('express');
const router = express.Router();
const Realm = require('realm')
const {APPID} = require("../utils/environment")
const app = Realm.App.getApp(APPID)
const {DEVELOPMENT_CLIENT_URL, PRODUCTION_CLIENT_URL} = require("../utils/environment")
const {sendEmails} = require("./menus");


router.get('/confirmEmail', async function (req, res, next) {
    const token = req.query.token;
    const tokenId = req.query.tokenId;
    try {
        await app.emailPasswordAuth.confirmUser({token, tokenId})
        // User email address confirmed.
        console.log("Successfully confirmed user")
    } catch (err) {
        console.log(`User confirmation failed: ${err}`);
    }
    res.render('redirect.ejs', {url: PRODUCTION_CLIENT_URL});
});


//FIXME Add backend reset password page?
router.get('/resetPassword', async function (req, res, next) {
    let token = req.query.token;
    let tokenId = req.query.tokenId;
    let password = req.query.password;
    if (password == null) {
        res.render('reset.ejs', {token: token, tokenId: tokenId, error: ""});
    } else {
        try {
            await app.emailPasswordAuth.resetPassword({
                password: password,
                token,
                tokenId,
            })
            console.log("Successfully reset password.")
            res.render('redirect.ejs', {url: PRODUCTION_CLIENT_URL})
        } catch (err) {
            console.log(err)
            res.render('reset.ejs', {token: token, tokenId: tokenId, error: err.error});

        }
    }
})

router.get('/testing', async function (req, res, next) {
   sendEmails().then(r => r)
    res.send("ok")
})




module.exports = router;
