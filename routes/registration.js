var express = require('express')
var router = express.Router();
var UC = require('../controller/registrationController')

/* SignUp */
router.get('/getUser' , UC.getUser)
router.post('/createUser', UC.createUser);
router.get('/getUserById/:id' , UC.getUserById)

// Login
router.post('/loginUser' , UC.loginUser)

module.exports = router;
