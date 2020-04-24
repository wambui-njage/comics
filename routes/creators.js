const { Creator, validate } = require("../models/creators");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const creators = await Creator.find();
  res.send(creators);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let creator = new Creator({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  creator = await Creator.save();

  res.send(creator);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const creator = await Creator.findByIdAndUpdate(
    req.params.id,
    {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    },
    { new: true }
  );

  if (!creator)
    return res
      .status(404)
      .send("The creator with the given ID was not found.");

  res.send(creator);
});

router.delete("/:id", auth, async (req, res) => {
  const creator = await Creator.findByIdAndRemove(req.params.id);

  if (!creator)
    return res
      .status(404)
      .send("The creator with the given ID was not found.");

  res.send(creator);
});

router.get("/:id", auth, async (req, res) => {

    try {
        const creator = await Creator.findById(req.params.id).select("-__v");
        res.send(creator);
      } catch(error) {
        return res
      .status(404)
      .send("The creator with the given ID was not found.");
      //log error
        console.error(error);
      } 
    

  res.send(creator);
});

module.exports = router;