const mongoose=require('mongoose');
const config = require("config");
module.exports=function(){

    mongoose.connect(config.get("db_url"),{  useCreateIndex: true,
    useNewUrlParser: true })
    .then((result)=>console.log("we in this mug"))
    .catch(err=>console.log("the devil is working",err));
}



 
