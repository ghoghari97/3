var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/redresh3").then( () => {
    console.log("connection Okay");
}).catch((e)=>{
    console.log(e);
})