const mongoose = require('mongoose');


// Announcements Schema

const Announcements = mongoose.model('announcements',{
    content:{
        type:String,
        required:true
    },
});

module.exports = {Announcements}