const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    passengers : {
        type : Number,
        required : true
    },
    transmission : {
        type : String,
        required : true
    },
    luggage : {
        type : Number,
        required : true
    },
    airCondition : {
        type : String,
        required : true
    },
    price : {
        type: Number,
        required : true
    },
    info: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Cars", carSchema);