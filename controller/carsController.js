const carsSchema = require("../model/carsModel");

exports.addCar = async (req, res) => {
    try {
        const data = req.body
        const files = req.files; 

        if (!files || files.length === 0) 
            throw new Error('No files uploaded')

        const imageFilenames = files.map(file => file.filename);
        
        const car = {
            name: req.body.name,
            images: imageFilenames,
            passengers: req.body.passengers,
            transmission: req.body.transmission,
            luggage: req.body.luggage,
            airCondition: req.body.airCondition,
            price: req.body.price,
            info: req.body.info
        }

        const carData = await carsSchema.create(car)
        res.status(200).json({
            status: "success",
            message: "Car Added successfully",
            data: carData
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Fail to add car",
            data: error.message
        })
    }
};

exports.getCars = async (req, res) => {
    try {
        const carsData = await carsSchema.find()
        res.status(200).json({
            status: "success",
            message: "Cars Get Successfully",
            data: carsData
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Fail to find car",
            data: error.message
        })
    }
};

exports.getCarById = async (req, res) => {
    try {
        const id = req.params.carId
        const carData = await carsSchema.findById(id)
        res.status(200).json({
            status: "success",
            message: "Car Get Successfully",
            data: carData
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Fail to find car",
            data: error.message
        })
    }
};