const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const Contact = require("../models/Contact");
const User = require("../models/User");

// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const contact = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/contacts
// @desc    Add new Contact
// @access  Private
router.post(
  "/",
  [auth, [check("name", "Name should not empty").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/contacts
// @desc    Update a contacts
// @access  Private
router.put("/:id", (req, res) => {
  // end-point is api/contacts/<id>
  res.send("Update contacts");
});

// @route   DELETE api/contacts
// @desc    Delete a contacts
// @access  Private
router.delete("/:id", (req, res) => {
  res.send("Delete contacts");
});

module.exports = router;
