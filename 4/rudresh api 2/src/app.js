var mongoose = require("mongoose");
var express = require("express");
var app = express();
var path = require("path");
var ejs = require("ejs");
var bodyParser = require('body-parser')
const fs= require('fs');
var multer = require("multer");
require('dotenv');
var port = process.env.PORT || 3000 ;
const cors= require('cors');

app.use( express.static( "public" ) );
app.use('/', express.static('images'));

var ejs_folder_path = path.join(__dirname,"../templates");
app.set('view engine', 'ejs');
app.set("views", ejs_folder_path );

app.use(bodyParser.urlencoded(
    { extended:true }
))

require("./db/conn");
var image = require("./models/schema");

app.use(cors({
    origin:" http://localhost:3000"
}))

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public')
    },
    filename: function (req, file, cb) {
    //   cb(null, file.fieldname + '-' + Date.now())
    cb(null,Date.now() + '--' + file.originalname);
    }
  })
  var upload = multer({ storage: storage })

app.get("/" , async (req,res)=>{
    res.render('Book');
})

app.post("/",upload.single('myImage'),async(req,res)=>{
    console.log(req.file);
    try { let data = new image ({
        // imgname:req.body.imgname,
        // img:{
        //     data: fs.readFileSync(req.file.path),
        //     contentType: 'image/png'
        // }
        imgname:req.file.filename
    });
    console.log(data);
    await data.save();
    }catch(e){
        console.log(e);
    }
    res.end();
})

app.get("/image" , async (req,res)=>{

    
    let users = await image.find();
    // res.send(users[0].imgname)
    // res.send(users[1].imgname)
    // for (i = 0; i < users.length; i++) {
    //     res.send(users[i].imgname);
    // }

    // console.log(users[0]);
    res.send(users);
})

app.get('/show',async(req,res)=>{
    let users = await image.find();
    res.render('show',{users});
})

// app.post('/show',async (req,res)=>{
//     var data = req.body;

//    // parseInt(data.password);
//    console.log(data.password);
//    let user = await Student.find({username:data.username});
//    console.log(user);
//    console.log(user[0].password);
//    if(user[0].password == data.password){
//        console.log("password matched");
//        res.render('profile',{user});
//    }
//    else {
//        console.log("wrong password or username");
//    }
 
// })

app.listen(port,()=>{
    console.log("app listen at port number 3000");
})