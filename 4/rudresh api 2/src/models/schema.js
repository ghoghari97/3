var mongoose = require("mongoose");
var validator = require("validator");

var imgSchema = mongoose.Schema({
    // imgname:{
    //     type:String,
    //     // require:true,
    //     // unique:[true,"This book name is already present"]
    // },
    // img:{data:Buffer,contentType: String}
    imgname:String
});
var image = mongoose.model("image",imgSchema);

module.exports = image ;