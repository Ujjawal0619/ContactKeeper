const express = require('express');
const router = express.Router();

// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private
router.get('/', (req, res) => { 
    res.send('Get all contacts')
});

// @route   POST api/contacts
// @desc    Add new Contact
// @access  Private
router.post('/', (req, res) => { 
    res.send('Add contacts')
});

// @route   PUT api/contacts
// @desc    Update a contacts
// @access  Private
router.put('/:id', (req, res) => { // end-point is api/contacts/<id>
    res.send('Update contacts')
});


// @route   DELETE api/contacts
// @desc    Delete a contacts
// @access  Private
router.delete('/:id', (req, res) => { 
    res.send('Delete contacts')
});

module.exports = router;