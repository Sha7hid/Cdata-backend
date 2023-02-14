const express = require('express');

const router = express.Router();

const {Blog} = require('../models/blog');

// Get All Blogs
router.get('/blogs', (req, res)=> {
    Blog.find({}, (err, data)=> {
        if (!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
});
// Save Blog 
router.post('/blog/add', (req,res) => {
    const blo = new Blog({
        heading: req.body.heading,
        date: req.body.date,
        content: req.body.content,
        image: req.body.image
    });
    blo.save((err, data) => {
        if (!err) {
            res.status(200).json({code:200, message:'Blog Added Successfully',
        addEmployee:data})
        } else {
            console.log(err);
        }
       
    })
});

// GEt Single Blog
router.get('/blog/:id', (req, res) => {
    Blog.findById(req.params.id,(err, data)=>{
        if (!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
});
// Update Blog
router.put('/blog/edit/:id',(req, res)=>{
const blo = {
    heading: req.body.heading,
    date: req.body.date,
    content: req.body.content,
    image: req.body.image
};
Blog.findByIdAndUpdate(req.params.id, {$set:blo}, {new:true}, (err, data)=> {
    if (!err) {
        res.status(200).json({code:200, message:'Blog Updated Successfully ',
    updateBlog:data })
    } else {
     console.log(err);   
    }
})
});
// Delete Blog
router.delete('/blog/:id', (req, res)=>{
    Blog.findByIdAndDelete(req.params.id, (err, data)=>{
        if (!err) {
            res.status(200).json({code:200, message:'Blog Deleted Successfully',
        deleteBlog: data});
        } else {
            console.log(err);
        }
    })
})

module.exports = router;