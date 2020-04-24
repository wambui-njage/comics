const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");
const storySchema = new mongoose.Schema({
    comic: { 
      type: new mongoose.Schema({
        
                name: {
                  type: String,
                  required: true,
                  minlength: 2,
                  maxlength: 50
                },
                email: {
                  type: String,
                  required: true,
                  minlength: 5,
                  maxlength: 255,
                  unique: true
                },
                password: {
                  type: String,
                  required: true,
                  minlength: 5,
                  maxlength: 1024
                },
                createdon: { 
                  type: Date
                }
            }),   
              required: true
            },
           
            createdon: { 
              type: Date, 
              required: true,
              default: Date.now
            },
            title: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 50
              },
              characters: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Character"
                }    
            ],

   
  });



const Story = mongoose.model("Story", storySchema);

function validateStory(story) {
    const schema = {
      creatorId: Joi.objectId().required(),
    
    };
  
    return Joi.validate(story, schema);
  }

exports.Story = Story;
exports.validateStory = validateStory;