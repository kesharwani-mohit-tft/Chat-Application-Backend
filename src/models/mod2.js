const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    }, 
    password:{
        type:String,
        required:true,
        trim:true
    },   
})
//we are creating a new Collection or model User
const User = new mongoose.model("User" ,userSchema)
module.exports = User;