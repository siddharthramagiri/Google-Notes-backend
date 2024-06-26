const express = require('express')
const router = express.Router();
const noteschema = require('../models/Notesmodel')
const errorhandle = require('../middlewares/ErrorHandler')
const {
    getNotes,
    AddNotes,
    ShowNote,
} = require('../controllers/noteControllers')

// END POINTS
router.post('/getnotes',getNotes);

router.post('/addnote',AddNotes);

router.post('/shownote', ShowNote);

module.exports = router