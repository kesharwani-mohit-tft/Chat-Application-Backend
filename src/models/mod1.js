const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sms:{
        type:String,
        required:true,
        trim:true
    },
    sender:{
        type:String,
        required:true,
        trim:true
    }, 
    receiver:{
        type:String,
        required:true,
        trim:true
    }, 
     time:{
        type:Date,
        required:true,
        trim:true
    },
 
})

//we are creating a new Collection or model
const Messages = new mongoose.model("Messages" ,messageSchema)
module.exports = Messages;
