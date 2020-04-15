const mongoose=require('mongoose');
module.exports=function(){

    mongoose.connect("mongodb://localhost/vineyard",{ useNewUrlParser: true })
    .then((result)=>console.log("we in this mug",result))
    .catch(err=>console.log("the devil is working",err));
}



 