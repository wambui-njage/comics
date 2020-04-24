const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
  
           
           
            name: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 50
              },
              comicin: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Comic"
                }    
            ],

   
            createdon: { 
            type: Date, 
            required: true,
            default: Date.now
            }
  });



const Character = mongoose.model("Character", characterSchema);

function validateCharacter(character) {
    const schema = {
      creatorId: Joi.objectId().required(),
    
    };
  
    return Joi.validate(character, schema);
  }

exports.Character = Character;
exports.validate = validateCharacter;