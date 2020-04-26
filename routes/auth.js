const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {Creator} = require('../models/creators');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {

  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let creator = await Creator.findOne({ email: req.body.email });
  if (!creator) return res.status(400).send('Invalid email or password.');

  console.log(creator)

  const validPassword = await bcrypt.compare(req.body.password, creator.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = creator.generateAuthToken();
  res.send(token);
});

function validate(req) {
  const schema = {
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(3).max(255).required()
  };

  return Joi.validate(req, schema);
}

module.exports = router; 