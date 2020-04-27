const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const creatorSchema = new mongoose.Schema({
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
  profilepic: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  createdon: { 
    type: Date
  }
});

creatorSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      
      name: this.name,
      email: this.email
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const Creator = mongoose.model("Creators", creatorSchema);

function validateUser(creator) {
  const schema = {
    name: Joi.string()
      .min(2)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
   createdon: Joi.date()
      .required()

  };

  return Joi.validate(creator, schema);
}

exports.Creator = Creator;
exports.validate = validateUser;