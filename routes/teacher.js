const express = require('express');

const router = express.Router();

const {Teacher} = require('../models/teacher');

// Get All Teachers
router.get('/', (req, res)=> {
    Teacher.find({}, (err, data)=> {
        if (!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
});
// Save Teacher
router.post('/add', (req,res) => {
    const tea = new Teacher({
        name: req.body.name,
        experience: req.body.experience,
        course: req.body.course,
        image: req.body.image
    });
    tea.save((err, data) => {
        if (!err) {
            res.status(200).json({code:200, message:'Teacher Added Successfully',
        addTeacher:data})
        } else {
            console.log(err);
        }
       
    })
});

// GEt Single Teacher
router.get('/teacher/:id', (req, res) => {
    Teacher.findById(req.params.id,(err, data)=>{
        if (!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
});
// Update Teacher
router.put('/teacher/edit/:id',(req, res)=>{
const tea = {
    name: req.body.name,
    experience: req.body.experience,
    course: req.body.course,
    image: req.body.image
};
Teacher.findByIdAndUpdate(req.params.id, {$set:tea}, {new:true}, (err, data)=> {
    if (!err) {
        res.status(200).json({code:200, message:'Teacher Updated Successfully ',
    updateTeacher:data })
    } else {
     console.log(err);   
    }
})
});
// Delete Teacher
router.delete('/teacher/:id', (req, res)=>{
    Teacher.findByIdAndDelete(req.params.id, (err, data)=>{
        if (!err) {
            res.status(200).json({code:200, message:'Teacher Deleted Successfully',
        deleteTeacher: data});
        } else {
            console.log(err);
        }
    })
})

module.exports = router;