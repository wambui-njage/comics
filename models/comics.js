const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const creatorSchema = new mongoose.Schema({
    creator: { 
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
    comicname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
      },
      isAvailable: {
        type: Boolean,
        default: true
      },
  });



const Comic = mongoose.model("Comic", creatorSchema);

function validateComic(comic) {
    const schema = {
      creatorId: Joi.objectId().required(),
    
    };
  
    return Joi.validate(comic, schema);
  }

exports.Comic = Comic;
exports.validate = Comic;