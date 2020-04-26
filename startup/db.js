const mongoose=require('mongoose');
module.exports=function(){

    mongoose.connect("mongodb+srv://comic:LCuQzVLDAUCzG7Nx@cluster0-e1gwz.azure.mongodb.net/test?retryWrites=true&w=majority",{  useCreateIndex: true,
    useNewUrlParser: true })
    .then((result)=>console.log("we in this mug"))
    .catch(err=>console.log("the devil is working",err));
}



 