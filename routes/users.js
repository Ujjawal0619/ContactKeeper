const express = require('express');
const router = express.Router();

// GET: recieve from server, POST: sending to server, 
// PUT: modifying somthing, DELETE: delete somthing

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', (req, res) => { // '/' represent api/users (defined in server.js)
    res.send('Register a user')
});

// to use this route we need to export it as router
module.exports = router;