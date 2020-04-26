const { Comic } = require("../models/comics");
const { Story } = require("../models/stories");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const Joi = require('joi');

router.get("/", auth, async (req, res) => {
  const comics = await Comic.find({"isAvailable":true});
  res.status(200).json({success: true, comics});

});

// router.post("/", auth, async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   let creator = new Creator({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password
//   });
//   creator = await Creator.save();

//   res.send(creator);
// });

// router.put("/:id", auth, async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const creator = await Creator.findByIdAndUpdate(
//     req.params.id,
//     {
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password
//     },
//     { new: true }
//   );

//   if (!creator)
//     return res
//       .status(404)
//       .send("The creator with the given ID was not found.");

//   res.send(creator);
// });

// router.delete("/:id", auth, async (req, res) => {
//   const creator = await Creator.findByIdAndRemove(req.params.id);

//   if (!creator)
//     return res
//       .status(404)
//       .send("The creator with the given ID was not found.");

//   res.send(creator);
// });

router.get("/:id", auth, async (req, res) => {

  const { error } = validate(req.params); 
  if (error) return res.status(400).json({success:false,error:error.details[0].message});

    try {
        const comic = await Comic.findById(req.params.id);
        res.status(200).json({success: true, comic});
      } catch(error) {
        return res
        .status(404)
        .json({success: false,error:'NOT FOUND'});
        //log error
        console.error(error);
      } 

 
});
router.get("/stories/:id", auth, async (req, res) => {

  const { error } = validate(req.params); 
  if (error) return res.status(400).json({success:false,error:error.details[0].message});
    try {
        const stories = await Story.find({"comics._id":req.params.id});
      
        if(!stories.length){
          
          return res.status(404).json({success: false,error:'NOT FOUND'});
         
        }
        
        return  res.status(200).json({success: true, stories});

      } catch(error) {
        return res
        .status(404)
        .json({success: false,error:'NOT FOUND'});
        //log error
        console.error(error);
      } 

 
});

router.get("/characters/:id", auth, async (req, res) => {
  const { error } = validate(req.params); 
  if (error) return res.status(400).json({success:false,error:error.details[0].message});

  const characters = await Story.find({"comics._id":req.params.id}).populate("characters");
  return characters

  try {
      // const characters = await Story.find({"comics._id":req.params.id}).populate("characters").select("characters");
      const characters = await Story.find({"comics._id":req.params.id}).populate("characters");
      // const characters = await Story.find({"comics._id":req.params.id});
      res.status(200).json({success: true, characters});
    } catch(error) {
      return res
      .status(404)
      .json({success: false,error:'NOT FOUND'});
      //log error
      console.error(error);
    } 


});

function validate(req) {
  const schema = {
    id: Joi.string().min(8).max(255).required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;