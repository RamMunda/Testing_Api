const express = require('express');
const route = express.Router();
require('dotenv').config();
const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
const jwt = require('jsonwebtoken');
const User = require('./User');
route.post('/',async(req,res)=>{
    const { name, email, password} = req.body;
    const user = new User({
        name,
        email,
        password
    });
    console.log(user);
    const payload = {
        user: {
            id: user.id
        }
    }

    jwt.sign(
        payload,
        "secretToken",
        { expiresIn: '5 days' },
        (err,token)=>{
            if(err) throw err;       
;
            const log = console.log;
        // Step 1
        const auth = {
            auth: {
                api_key: process.env.Api_KEY , // TODO: 
                domain: process.env.domain // TODO:
            }
        };

        // Step 2
        let transporter = nodemailer.createTransport( mailGun(auth) );

        const url = `http://localhost:5000/email_validate_confirmation/${token}`;
        // Step 3
        let mailOptions = {
            from: 'rk8230521@gmail.com', // TODO: email sender
            to: email, // TODO: email receiver
            subject: 'Email Verification',
            html: `<h1>Please click on this link to activate your account</h1><br><br><p><a href=${url}>${url}</a></p>`
        };

        // Step 4
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                return log(err);
            }
            res.send("it is working...")
            return log('Email sent!!!');
        });
                }
            )

})

module.exports = route;

