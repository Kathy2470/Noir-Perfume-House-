const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({

name:{
type:String,
required:true
},

brand:String,

category:String,

price:Number,

size:String,

image:String,

description:String,

featured:{
type:Boolean,
default:false
},

active:{
type:Boolean,
default:true
}

},{timestamps:true});

module.exports = mongoose.model("Product", ProductSchema);
