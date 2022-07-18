var express = require("express");
var app = express();
var port = process.env.PORT || 3000 ;
require("./db/conn");
var path = require("path");
var ejs = require("ejs");
const bodyParser = require("body-parser");
const cors= require('cors');
var MenRanking = require("./models/mens");

app.use(express.json());
app.use(express.urlencoded({extended:false})); 

var ejs_folder_path = path.join(__dirname,"../templates");
console.log(ejs_folder_path);
app.set("view engine","ejs");
app.set("views", ejs_folder_path );

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.get("/home",async (req,res)=>{
    res.send("this is home page");
});

app.get("/signup" , (req,res)=>{
    res.render('home');
});

app.post("/signup" , async (req,res)=>{
    try{
        var addingMensRecords = new MenRanking(
            {
                title:req.body.title,
                description:req.body.description
            });

                await addingMensRecords.save();
                var abc = "Hi";
                // res.cookie("jwt","123");
                res.json({"message":"data uploaded"}); 

    }catch(e){
        console.log(e);
    }
    // res.cookie("jwt","123");
    // let users = await MenRanking.find(req.body.name);
    // res.redirect("/signup");
    // res.redirect("/signup",{users.name});
    // res.render('home')
});

app.use(express.json());
app.use(cors({
    origin:" http://localhost:3000"
}))

// app.post( "/mens" , async (req,res) => {

//     try{
//         var addingMensRecords = new MenRanking (
//             {
//             "firstname":"anuj",
//             "lastname":"sharma",
//             "city":"Surat"
//         },

//         // req.body

//         );

//         addingMensRecords.save();

//         console.log(addingMensRecords);

//     }catch(e){
//         res.status(400).send(e);
//     }});

    app.post( "/mens" , async (req,res) => {

        var addingMensRecords = new MenRanking(req.body);
        console.log(addingMensRecords);
    
        try{
            var insertMens = await addingMensRecords.save();
                res.status(201).send(insertMens)
                res.send(insertMens);
        }catch(e){
            res.status(400).send(e);
        }});

        app.get("/Students" , async (req,res) => {

            try{
                var studentsData = await MenRanking.find();
                res.send(studentsData);
            }catch(err){
                res.send(err);
            }
            res.end();
        });

        app.get('/delete/:_id',async (req,res)=>{
            let _id = req.params._id;
            let data = await MenRanking.findByIdAndDelete(_id);
            // res.redirect('/signin');
            res.send("data deleted");
        })

        app.get("/edit/:_id" , async (req,res) => {
            let _id = req.params._id;
            let data = await MenRanking.findById(_id);
            // console.log(data);
            res.render('edit',{data});
        });

        app.post("/edit/:_id" , async (req,res) => {
            let _id = req.params._id;
            let data = await MenRanking.findById(_id);
            let update_data = await MenRanking.findByIdAndUpdate({_id},{$set:{title:req.body.title,
                description:req.body.description}});
                update_data.save();
                res.send("data updated");
        });
        

app.listen(port ,'0.0.0.0', ()=>{ 
    console.log("okay");
});