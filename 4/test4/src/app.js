var express = require("express");
var app = express();
var mongoose = require("mongoose");
var port = process.env.PORT || 3500 ;
require("./db/conn");
var FirstCollection = require("./models/schema");

require('dotenv').config();

var ejs = require("ejs");
var path = require("path");
var ejs_folder_path = path.join(__dirname,"../templates");
app.set("view engine","ejs");
app.set("views", ejs_folder_path );

var jwt = require("jsonwebtoken");

var bodyParser = require("body-parser");
app.use(express.json());
app.use(express.urlencoded({extended:false}));

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var bcrypt = require("bcryptjs");

var nodemailer = require('nodemailer');

var fs = require('fs');

let alert = require('alert');

app.get("/" , (req,res)=>{
    res.send(process.env.SECRET_KEY);
});

app.get("/signup" , async (req,res)=>{
    res.render('home');
});

app.post("/signup" , async (req,res)=>{

    var token = jwt.sign({username:req.body.username},process.env.SECRET_KEY);
    var userverify = await jwt.verify(token,process.env.SECRET_KEY);

    res.cookie("token",token);

    deletinguser = await FirstCollection.find({complete:"no"}).deleteMany();

    try{

            if(req.body.password == req.body.confirmpassword){

                function between(min, max) {  
                    return Math.floor(
                      Math.random() * (max - min) + min
                    )
                  }
            
                  var otp = between(100000, 999999);

                  var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'ghogharinikunj97@gmail.com',
                        pass: 'tjgjgbpgzsujdnsi'
                    }
                });
            
                var mailOptions = {
                    from: 'ghogharinikunj97@gmail.com',                   // sender's gmail
                    to: `${req.body.Email}` ,                  // receiver's gmail
                    subject: 'one time otp',     //subject
                    text: `${otp}`                      //message Description
                };
            
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    }
                });

                var addingMensRecords = new FirstCollection(
                    {
                        username:req.body.username,
                        password:await bcrypt.hash(req.body.password,12),
                        confirmpassword:req.body.confirmpassword,
                        Email:req.body.Email,
                        otp:otp,
                        complete:"no",
                        token:token
                    });

                await addingMensRecords.save();
                res.redirect('/otp'); 

            }else{
                alert("password and confirm password does not match");
                res.redirect('/signup'); 
            }

    }catch(e){
        alert("user already available");
        res.redirect('/signup');
    }

});

app.get("/otp" , async (req,res)=>{
    res.render('otp');
});

app.post("/otp" , async (req,res)=>{

    user = await FirstCollection.findOne({token:req.cookies.token});

    try{

        if(req.body.otp == user.otp){
            
            var updateuser = await FirstCollection.findOneAndUpdate({token:req.cookies.token},{$set:{complete:"yes"}});
            await updateuser.save();

            res.redirect('login');

        }

    else{
        alert("otp invalid");
        res.redirect('signup');
    }

}catch(e){

    }

});

app.get("/login" , (req,res)=>{
    res.render('login');
});

app.post("/login" , async (req,res)=>{

    try{

    // var user1 = await FirstCollection.find({token:req.cookies.token});
    var user2 = await FirstCollection.find({username:req.body.loginusername})
    var Passwordmatch = await bcrypt.compare(req.body.loginpassword,user[0].password);

    var userverify = await jwt.verify(req.cookies.token,process.env.SECRET_KEY);

    if(Passwordmatch){

        var tokeen = jwt.sign({username:req.body.loginusername},process.env.SECRET_KEY);

        res.cookie("tokeen",tokeen 
            , {
                expires: new Date(Date.now()+1000) // here we are write milisecond
                ,httpOnly:true // if we are write this lines so user does not removes or modifies cookies
                // ,secure:true  // this cokkie is run only where their secure connections are presents means http connections
            });

            res.redirect('first');

    }

    else {
        alert("wrong password or username");
        res.redirect('login');
    }

    }catch(e){

    }

});

app.get("/first" , async (req,res)=>{

    var a = req.cookies.tokeen

    if(a == null){
        res.redirect('login');
    }else{
        res.render('first')
    }

});

app.post("/first" , async (req,res)=>{

})

app.listen(port , ()=>{
    console.log("Okay");
})