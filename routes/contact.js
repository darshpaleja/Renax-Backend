const express = require('express');
const router = express.Router();
const CC = require('../controller/contactController')
const authCheck = require('../middleware/authCheck')

router.post('/send' , authCheck.tokenSecure , CC.postContact)
router.get('/getContact/:userId' , authCheck.tokenSecure , CC.getUserContact)

module.exports = router;