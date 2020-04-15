const mongoose=require('mongoose');


const schemaBlog=new mongoose.Schema({
    title:{type:String},
    content:{type:String},
    created_at:{type:Date},
    publish_at:{type:Date},
    publishby:{type:String},
    tags:{type:Array},
    images:{ data: Buffer, contentType: String }

});


const Blog= mongoose.model("Blog",schemaBlog);


module.exports=Blog;



