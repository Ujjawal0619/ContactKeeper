const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User'); // user model
// GET: recieve from server, POST: sending to server,
// PUT: modifying somthing, DELETE: delete somthing

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  '/', // '/' represent api/users (defined in server.js)
  [
    check('name', 'name is required').not().isEmpty(),
    check('phone', 'Please include a valid phone number').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a passowrd with 6 or moer characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, phone } = req.body;

    try {
      let user = await User.findOne({ email });
      let number = await User.findOne({ phone });
      if (user || number) {
        return res.status(400).json({ msg: 'user or number already exist' });
      }

      user = new User({
        name,
        email,
        password,
        phone,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// to use this route we need to export it as router
module.exports = router;
