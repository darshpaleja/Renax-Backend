const express = require('express');
const router = express.Router();
const BC = require('../controller/bookingController');
const authCheck = require('../middleware/authCheck');

router.post('/addBooking', authCheck.tokenSecure, BC.addBooking);
router.get('/getBooking', authCheck.tokenSecure, BC.getBookings);
router.get('/getBookingByUser/:userId', authCheck.tokenSecure, BC.getBookingsByUser);
router.patch('/updateStatus/:bookingId', authCheck.tokenSecure, BC.updateStatus);

module.exports = router;