const express = require('express');
const route = express.Router();
require('dotenv').config();
const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
const auth = require('./auth');
route.get('/:token',auth,async(req,res)=>{
    console.log("your Email is veified");
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

    // Step 3
    let mailOptions = {
        from: 'rk8230521@gmail.com', // TODO: email sender
        to: 'kram766@gmail.com', // TODO: email receiver
        subject: 'Email Verification',
        html: `   <div class="mycontaner" style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);">
        <div class="myimage1">
            <img src="https://res.cloudinary.com/do8cjzoj5/image/upload/v1609513097/team2.jpg" width="80%">
        </div>
        <div class="mycontent" style="font-family: sans-serif">
            Hi! Ram<br>
            Congraturation
        </div>
    </div>`
    };

    // Step 4
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return log(err);
        }
    });
    return res.send({ msg : "your Email is veified"});
})

module.exports = route;