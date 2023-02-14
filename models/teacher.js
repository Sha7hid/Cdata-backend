const mongoose = require('mongoose');


// teacher Schema

const Teacher = mongoose.model('teachers',{
    name:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
});

module.exports = {Teacher}