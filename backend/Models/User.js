const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required :true,
        unique:true,
        minLength:3
    },
    password:{
        type:String,
        // required :true,
        minLength:8
    },
    number:{
        type:String,
        required :true,
        unique:true,
        length:10
    },
    email:{
        type:String,
        // required:true,
        unique:true,
        // minLength:10
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
  });


module.exports= mongoose.model('User', userSchema);
