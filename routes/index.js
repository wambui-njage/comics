const Joi = require('joi');
const _ = require('lodash');
const axios = require('axios')
const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");

router.get('/login', async (req, res) => {

    return res.render("auth/login")


});

router.get('/', auth, async (req, res) => {


  return res.render("creator")


});

router.get('/creator/:id', auth, async (req, res) => {


  return res.render("creator/view",{ id: req.params.id})


});

router.get('/comics', auth, async (req, res) => {


  return res.render("comics")


});

router.get('/comics/:id', auth, async (req, res) => {


  return res.render("comics/view",{ id: req.params.id})


});

router.get('/characters/:id', auth, async (req, res) => {


  return res.render("characters",{ id: req.params.id})


});

function validate(req) {
  const schema = {
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(3).max(255).required()
  };

  return Joi.validate(req, schema);
}

module.exports = router; 