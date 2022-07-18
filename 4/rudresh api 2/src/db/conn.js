var mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/last")
.then( ()=>{
    console.log("okay");
})
.catch( (e)=>{
    console.log(e);
})