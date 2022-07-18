var mongoose = require("mongoose");
var express = require("express");
var validator = require("validator")

var menSchema = new mongoose.Schema({
    title:{
        type:String,
        trim : true ,
        required : true 
    },
    description:{
        type:String,
        trim : true ,
        required : true 
    }

});

var MenRanking = new mongoose.model("MenRanking" , menSchema );

module.exports = MenRanking ;