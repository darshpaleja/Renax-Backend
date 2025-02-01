const express = require('express');
const router = express.Router();
const CC = require('../controller/carsController')
const authCheck = require('../middleware/authCheck')
const upload = require('../middleware/multer');

router.post('/addCar' , upload.array("images") , authCheck.tokenSecure , CC.addCar)
router.get('/getCars' , authCheck.tokenSecure , CC.getCars)
router.get('/getCar/:carId' , authCheck.tokenSecure , CC.getCarById)

module.exports = router;