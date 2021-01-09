const express = require('express');
const router = express.Router();

// GET: recieve from server, POST: sending to server, 
// PUT: modifying somthing, DELETE: delete somthing

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', (req, res) => { // '/' represent api/auth (defined in server.js)
    res.send('Get loggend in user')
});

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post('/', (req, res) => {
    res.send('Log in user')
});

// to use this route we need to export it as router
module.exports = router;