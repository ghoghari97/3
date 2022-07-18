var mongoose = require("mongoose");
var express = require("express");
var validator = require("validator")

var firstSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique : [true]
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    },
    Email:{
        type:String ,                                                                                         
        trim : true ,
        required : true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new error("Email is not valid");
            }
        }
    },
    complete:{
        type:String
    },
    otp:{
        type:Number
    },
    token:{
        type:String
    },
    tokeen:{
        type:String
    }
});

var FirstCollection = mongoose.model("collectionname",firstSchema);
module.exports = FirstCollection;