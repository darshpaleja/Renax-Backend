const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Registration"
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    subject: {
        type: String,
        required: true  
    },
    message: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Contact", contactSchema);