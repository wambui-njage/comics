const express=require("express");
const router = express.Router();
const create= require('./models/blog.js');

router.get("/",(req,res)=>{
    res.render('blog-single');
});

router.post("/:id",(req,res)=>{
    
});




module.exports =router