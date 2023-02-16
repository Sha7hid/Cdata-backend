const express = require('express');

const router = express.Router();

const {Announcements} = require('../models/announcements');

// Get All Announcements
router.get('/', (req, res)=> {
    Announcements.find({}, (err, data)=> {
        if (!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
});
// Save Announcements 
router.post('/add', (req,res) => {
    const ann = new Announcements({
        content: req.body.content,
    });
    ann.save((err, data) => {
        if (!err) {
            res.status(200).json({code:200, message:'Announcement Added Successfully',
        addAnnouncement:data})
        } else {
            console.log(err);
        }
       
    })
});

// GEt Single Announcement
router.get('/announcement/:id', (req, res) => {
    Announcements.findById(req.params.id,(err, data)=>{
        if (!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
});
// Update Announcement
router.put('/announcement/edit/:id',(req, res)=>{
const ann = {
    content: req.body.content,
};
Announcements.findByIdAndUpdate(req.params.id, {$set:ann}, {new:true}, (err, data)=> {
    if (!err) {
        res.status(200).json({code:200, message:'Announcement Updated Successfully ',
    updateAnnouncement:data })
    } else {
     console.log(err);   
    }
})
});
// Delete Announcement
router.delete('/announcement/:id', (req, res)=>{
    Announcements.findByIdAndDelete(req.params.id, (err, data)=>{
        if (!err) {
            res.status(200).json({code:200, message:'Announcement Deleted Successfully',
        deleteAnnouncement: data});
        } else {
            console.log(err);
        }
    })
})

module.exports = router;