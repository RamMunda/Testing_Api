const express = require('express');
const passport = require('passport');
// const dns = require('dns');

const app = express();
require('./PassportVerify');
require('./FacebookVerify');
app.set('view engine','ejs');
app.get('/',(req, res)=>{
    res.render('pages/index');
});
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.get('/google',passport.authenticate('google',{scope : [ 'profile', 'email']}));
// dns.lookup('kshyam.ml/scripts/', (err, address, family) => {
//     console.log('address: %j family: IPv%s', address, family);
//   });
app.get('/facebook',passport.authenticate('facebook',{scope : 'email'}));

app.use('/api/email_verification', require('./Emailverification'));

app.use('/email_validate_confirmation',require('./Email_verify_confimation'));
app.get('/success',async(req,res)=>{
  res.render('pages/pfile');
})


app.get('/google/callback',passport.authenticate('google',{failureRedirect:'/failed'}),async(req,res)=>{
  res.redirect('/success');
})

app.get('/facebook/callback',passport.authenticate('facebook',{failureRedirect:'/failed'}),async(req,res)=>{
  res.redirect('/success');
})


const port = process.env.PORT || 5000;
app.listen(port,()=>console.log(`listening port 5000...`));