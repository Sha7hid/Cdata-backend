const mongoose = require('mongoose');


// student Schema

const Student = mongoose.model('students',{
    name:{
        type:String,
        required:true
    },
    age:{
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

module.exports = {Student}