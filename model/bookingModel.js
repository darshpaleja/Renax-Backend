const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Registration",
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone : {
        type : Number,
        required : true
    },
    car : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Cars",
        required : true
    },
    pickupLocation : {
        type : String,
        enum : [ "Dubai" , "Abu Dhabi" , "Sharjah" , "Alain" ] ,
        required : true
    },
    pickupDate : {
        type : Date,
        required : true
    },
    dropLocation : {
        type: String,
        enum : [ "Dubai" , "Abu Dhabi" , "Sharjah" , "Alain" ],
        required : true
    },
    returnDate: {
        type: Date,
        required: true
    },
    carPrice: {
        type: Number,
        required: true
    },
    totalDays: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    additionalNote: {
        type : String
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled"],
        default: "pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }


})

module.exports = mongoose.model("booking", bookingSchema);