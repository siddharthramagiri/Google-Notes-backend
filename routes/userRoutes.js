const express = require('express')
const router = express.Router();
const {
    LoginUser,
    SignupUser
} = require('../controllers/userControllers')

// END POINTS OF API
router.post('/login', LoginUser);

router.post('/signup', SignupUser);

module.exports = router