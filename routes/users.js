const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../models/User'); // user model
// GET: recieve from server, POST: sending to server, 
// PUT: modifying somthing, DELETE: delete somthing

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/',
    [check('name', 'name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a passowrd with 6 or moer characters').isLength({min: 6})]
    ,(req, res) => { // '/' represent api/users (defined in server.js)
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.send("passed...");
});

// to use this route we need to export it as router
module.exports = router;