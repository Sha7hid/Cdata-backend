const express = require('express');

const router = express.Router();

const {Student} = require('../models/student');

// Get All Students
router.get('/', (req, res)=> {
    Student.find({}, (err, data)=> {
        if (!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
});
// Save student
router.post('/add', (req,res) => {
    const stu = new Student({
        name: req.body.name,
        age: req.body.age,
        course: req.body.course,
        image: req.body.image
    });
    stu.save((err, data) => {
        if (!err) {
            res.status(200).json({code:200, message:'Student Added Successfully',
        addStudent:data})
        } else {
            console.log(err);
        }
       
    })
});

// GEt Single student
router.get('/student/:id', (req, res) => {
    Student.findById(req.params.id,(err, data)=>{
        if (!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
});
// Update Student
router.put('/student/edit/:id',(req, res)=>{
const stu = {
    name: req.body.name,
    age: req.body.age,
    course: req.body.course,
    image: req.body.image
};
Student.findByIdAndUpdate(req.params.id, {$set:stu}, {new:true}, (err, data)=> {
    if (!err) {
        res.status(200).json({code:200, message:'Student Updated Successfully ',
    updateStudent:data })
    } else {
     console.log(err);   
    }
})
});
// Delete Student
router.delete('/student/:id', (req, res)=>{
    Student.findByIdAndDelete(req.params.id, (err, data)=>{
        if (!err) {
            res.status(200).json({code:200, message:'Student Deleted Successfully',
        deleteStudent: data});
        } else {
            console.log(err);
        }
    })
})

module.exports = router;