const bookingSchema = require("../model/bookingModel");
const carsSchema = require("../model/carsModel");
const nodemailer = require("nodemailer");
const admin = require("../config/firebaseAdmin");
const userSchema = require("../model/registrationModel");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "darshpaleja7@gmail.com",
        pass: "aklbkhwnwhtffizd",
    },
});

exports.addBooking = async (req, res) => {
    try {
        const data = req.body;
        const carId = data.car;
        const carData = await carsSchema.findById(carId);
        if (!carData) {
            return res.status(404).json({ error: "Car not found" });
        }

        const carPrice = carData.price;
        const carImage = carData.images[0];
        const carImageUrl = `https://renax-backend.onrender.com/public/images/${carImage}`;

        // Calculate total days & ppprice
        const pickupDate = new Date(data.pickupDate);
        const returnDate = new Date(data.returnDate);
        const timeDifference = returnDate - pickupDate;
        const totalDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1;
        const totalPrice = carPrice * totalDays;

        const bookingData = {
            userId: data.userId,
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            car: carId,
            pickupLocation: data.pickupLocation,
            pickupDate: data.pickupDate,
            dropLocation: data.dropLocation,
            returnDate: data.returnDate,
            carPrice: carPrice,
            totalDays: totalDays,
            totalPrice: totalPrice,
            additionalNote: data.additionalNote,
            status: "pending",
            createdAt: new Date()
        };

        // Save booking data to database
        const booking = await bookingSchema.create(bookingData);

        const user = await userSchema.findById(data.userId);
        // console.log(user , "user from booking controller");
        if (!user || !user.fcmToken) {
            console.log("User FCM Token Not Found");
        } else {

            const fcmToken = user.fcmToken;
            console.log(fcmToken + "fcmToken from booking controller");

            const message = {
                token: fcmToken,
                notification: {
                    title: "Booking Confirmed! 🚗",
                    body: `Your car rental booking for ${carData.name} is confirmed. Total Price: $${totalPrice}`,
                    image: "https://i.pinimg.com/736x/e5/69/f1/e569f164af82f8268637f3ab89cd6f7f.jpg"
                },
                data: {
                    bookingId: booking._id.toString(),
                    carName: carData.name,
                    pickupDate: data.pickupDate,
                    returnDate: data.returnDate
                }
            };

            admin.messaging().send(message)
                .then((response) => {
                    console.log("Notification sent successfully:", response);
                })
                .catch((error) => {
                    console.error("Error sending notification:", error);
                });
        }

        // // Send booking confirmation email
        const mailOptions = {
            from: '"🚗 Renax Car Rental Services 🚗" <darshpaleja7@gmail.com>',
            to: data.email,
            subject: "🎉 Your Car Rental Booking Confirmation - Renax Cars",
            html: `
                <div style="font-family: 'Outfit', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1b1b1b; border-radius: 15px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);">
                    <!-- Header Section -->
                    <div style="text-align: center; padding: 30px; background: linear-gradient(45deg, #222222, #1b1b1b); border-radius: 15px;">
                        <h1 style="color: #F5B754; margin: 0; font-size: 28px; font-weight: 600;">Booking Confirmed! 🎉</h1>
                        <p style="color: #ffffff; margin-top: 10px; font-size: 16px;">Thank you for choosing Renax Car Rental. Your journey begins now!</p>
                    </div>
        
                    <!-- Car Details Section -->
                    <div style="background-color: #222222; padding: 30px; border-radius: 15px; margin-top: 20px;">
                        <h2 style="color: #F5B754; font-size: 22px; margin-bottom: 20px; font-weight: 600; text-align: center;">Your Selected Car</h2>
                        
                        <!-- Car Image and Basic Info -->
                        <div style="background-color: #1b1b1b; padding: 20px; border-radius: 10px; margin-bottom: 20px; text-align: center;">
                            <img src="${carImageUrl}" alt="${carData.name}" style="width: 100%; max-width: 300px; height: auto; border-radius: 10px; margin-bottom: 15px;">
                            <h3 style="color: #F5B754; font-size: 24px; margin: 10px 0;">${carData.name}</h3>
                            
                            <!-- Car Specifications -->
                            <div style="display: flex; justify-content: space-around; margin-top: 15px; flex-wrap: wrap;">
                                <div style="color: #ffffff; text-align: center; margin: 10px;">
                                    <p style="margin: 5px 0; font-size: 14px;">👥 Passengers</p>
                                    <p style="color: #F5B754; font-size: 16px; font-weight: 600;">${carData.passengers}</p>
                                </div>
                                <div style="color: #ffffff; text-align: center; margin: 10px;">
                                    <p style="margin: 5px 0; font-size: 14px;">🛄 Luggage</p>
                                    <p style="color: #F5B754; font-size: 16px; font-weight: 600;">${carData.luggage}</p>
                                </div>
                                <div style="color: #ffffff; text-align: center; margin: 10px;">
                                    <p style="margin: 5px 0; font-size: 14px;">⚙️ Transmission</p>
                                    <p style="color: #F5B754; font-size: 16px; font-weight: 600;">${carData.transmission}</p>
                                </div>
                            </div>
                        </div>
        
                        <!-- Pricing Details -->
                        <div style="background-color: #1b1b1b; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                            <h3 style="color: #F5B754; font-size: 18px; margin-bottom: 15px; text-align: center;">Rental Summary</h3>
                            <div style="color: #ffffff;">
                                <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                                    <span>Daily Rate:</span>
                                    <span style="color: #F5B754;">$${carPrice}/day</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                                    <span>Total Days:</span>
                                    <span style="color: #F5B754;">${totalDays} days</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; margin: 10px 0; padding-top: 10px; border-top: 1px solid #333;">
                                    <span style="font-weight: bold;">Total Amount:</span>
                                    <span style="color: #F5B754; font-weight: bold;">$${totalPrice}</span>
                                </div>
                            </div>
                        </div>
        
                        <!-- Customer Info -->
                        <div style="background-color: #1b1b1b; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                            <h3 style="color: #F5B754; font-size: 18px; margin-bottom: 15px; text-align: center;">Customer Information</h3>
                            <p style="color: #ffffff; margin: 5px 0;">📝 Name: ${data.fullName}</p>
                            <p style="color: #ffffff; margin: 5px 0;">📧 Email: ${data.email}</p>
                            <p style="color: #ffffff; margin: 5px 0;">📞 Phone: ${data.phone}</p>
                        </div>
        
                        <!-- Rental Details -->
                        <div style="background-color: #1b1b1b; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                            <h3 style="color: #F5B754; font-size: 18px; margin-bottom: 15px; text-align: center;">Rental Information</h3>
                            <p style="color: #ffffff; margin: 5px 0;">📍 Pickup Location: ${data.pickupLocation}</p>
                            <p style="color: #ffffff; margin: 5px 0;">📅 Pickup Date: ${new Date(data.pickupDate).toLocaleDateString()}</p>
                            <p style="color: #ffffff; margin: 5px 0;">📍 Drop Location: ${data.dropLocation}</p>
                            <p style="color: #ffffff; margin: 5px 0;">📅 Return Date: ${new Date(data.returnDate).toLocaleDateString()}</p>
                            ${data.additionalNote ? `<p style="color: #ffffff; margin: 5px 0;">📝 Additional Note: ${data.additionalNote}</p>` : ''}
                        </div>
        
                        <!-- Next Steps Section -->
                        <div style="background-color: #1b1b1b; padding: 20px; border-radius: 10px; margin-bottom: 20px; text-align: center;">
                            <h3 style="color: #F5B754; font-size: 18px; margin-bottom: 15px;">Next Steps</h3>
                            <p style="color: #ffffff; margin: 5px 0;">You can check the status of your booking and manage it on your profile page.</p>
                            <a href="http://localhost:3000/profile" style="display: inline-block; margin-top: 15px; padding: 12px 16px; background-color: #F5B754; color: #1b1b1b; text-decoration: none; border-radius: 25px; font-size: 13px; font-weight: 300;">
                                Go to Profile
                            </a>
                        </div>
        
                        <!-- Required Documents -->
                        <div style="background-color: #1b1b1b; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                            <h3 style="color: #F5B754; font-size: 18px; margin-bottom: 15px; text-align: center;">Required Documents</h3>
                            <ul style="color: #ffffff; margin: 10px 0; padding-left: 20px;">
                                <li style="margin-bottom: 8px">✅ Valid Driver's License</li>
                                <li style="margin-bottom: 8px">💳 Credit Card</li>
                                <li style="margin-bottom: 8px">🆔 Valid ID/Passport</li>
                                <li style="margin-bottom: 8px">💰 Security Deposit (refundable)</li>
                            </ul>
                        </div>
        
                        <!-- Contact Information -->
                        <div style="background-color: #1b1b1b; padding: 20px; border-radius: 10px; border: 1px solid #F5B754;">
                            <h3 style="color: #F5B754; font-size: 18px; margin-bottom: 15px; text-align: center;">Need Assistance?</h3>
                            <p style="color: #ffffff; margin: 5px 0;">📞 24/7 Support: +1 234 567 8900</p>
                            <p style="color: #ffffff; margin: 5px 0;">📧 Email: support@renaxcars.com</p>
                            <p style="color: #ffffff; margin: 5px 0;">💬 WhatsApp: +1 234 567 8900</p>
                        </div>
                    </div>
        
                    <!-- Footer -->
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #F5B754;">
                        <p style="color: #F5B754; font-size: 16px; font-weight: 500;">
                            Thank you for choosing Renax Car Rental!<br>
                            <span style="color: #ffffff; font-size: 14px;">Your Journey Begins Here</span>
                        </p>
                        <p style="color: #999999; font-size: 12px; margin-top: 15px;">
                            © ${new Date().getFullYear()} Renax Car Rental. All rights reserved.<br>
                            This is an automated message, please do not reply.
                        </p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            status: "success",
            message: "Booking Added Successfully",
            data: bookingData,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Fail to add booking",
            data: error.message,
        });
    }
};

exports.getBookings = async (req, res) => {
    try {
        const allBookings = await bookingSchema.find().populate("userId").populate("car")
        res.status(200).json({
            status: "success",
            message: "Get All Bookings",
            data: allBookings
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Fail to get all bookings",
            data: error.message
        })
    }
}

exports.getBookingsByUser = async (req, res) => {
    try {
        const id = req.params.userId
        const userBookings = await bookingSchema.find({ userId: id }).populate("userId").populate("car")
        res.status(200).json({
            status: "success",
            message: "Get User Bookings",
            data: userBookings
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Fail to get user bookings",
            data: error.message
        })
    }
}

// Update Status
exports.updateStatus = async (req, res) => {
    try {
        const id = req.params.bookingId;
        const status = req.body.status;
        const bookingData = await bookingSchema.findById(id).populate('car').populate('userId');

        // Status Confirm mail
        if (status === "confirmed") {
            // Send confirmation email
            const mailOptions = {
                from: '"🚗 Renax Car Rental Services 🚗" <darshpaleja7@gmail.com>',
                to: bookingData.email,
                subject: "🎉 Your Car is Ready for Pickup - Renax Cars",
                html: `
                    <div style="font-family: 'Outfit', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1b1b1b; border-radius: 15px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);">
                        <!-- Header Section -->
                        <div style="text-align: center; padding: 30px; background: linear-gradient(45deg, #222222, #1b1b1b); border-radius: 15px;">
                            <h1 style="color: #F5B754; margin: 0; font-size: 28px; font-weight: 600;">Your Car is Ready! 🚗</h1>
                            <p style="color: #ffffff; margin-top: 10px; font-size: 16px;">Your car is ready for pickup at the specified location.</p>
                        </div>

                        <!-- Car Details Section -->
                        <div style="background-color: #222222; padding: 30px; border-radius: 15px; margin-top: 20px;">
                            <!-- Car Image and Info -->
                            <div style="background-color: #1b1b1b; padding: 20px; border-radius: 10px; margin-bottom: 20px; text-align: center;">
                                <img src="https://renax-backend.onrender.com/public/images/${bookingData.car.images[0]}" 
                                     alt="${bookingData.car.name}" 
                                     style="width: 100%; max-width: 300px; height: auto; border-radius: 10px; margin-bottom: 15px;">
                                <h3 style="color: #F5B754; font-size: 24px; margin: 10px 0;">${bookingData.car.name}</h3>
                            </div>

                            <!-- Pickup Details -->
                            <div style="background-color: #1b1b1b; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                                <h3 style="color: #F5B754; font-size: 18px; margin-bottom: 15px;">Pickup Information</h3>
                                <p style="color: #ffffff; margin: 5px 0;">📍 Location: ${bookingData.pickupLocation}</p>
                                <p style="color: #ffffff; margin: 5px 0;">📅 Date: ${new Date(bookingData.pickupDate).toLocaleDateString()}</p>
                                <p style="color: #ffffff; margin: 5px 0;">⏰ Time: Please arrive between 9:00 AM - 6:00 PM</p>
                            </div>

                            <!-- Return Details -->
                            <div style="background-color: #1b1b1b; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                                <h3 style="color: #F5B754; font-size: 18px; margin-bottom: 15px;">Return Information</h3>
                                <p style="color: #ffffff; margin: 5px 0;">📍 Location: ${bookingData.dropLocation}</p>
                                <p style="color: #ffffff; margin: 5px 0;">📅 Date: ${new Date(bookingData.returnDate).toLocaleDateString()}</p>
                                <p style="color: #ffffff; margin: 5px 0;">⚠️ Please ensure to return the car before 6:00 PM on the return date</p>
                            </div>

                            <!-- Required Documents Reminder -->
                            <div style="background-color: #1b1b1b; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                                <h3 style="color: #F5B754; font-size: 18px; margin-bottom: 15px;">Don't Forget to Bring</h3>
                                <ul style="color: #ffffff; margin: 10px 0; padding-left: 20px;">
                                    <li style="margin-bottom: 8px">✅ Valid Driver's License</li>
                                    <li style="margin-bottom: 8px">💳 Credit Card for Security Deposit</li>
                                    <li style="margin-bottom: 8px">🆔 Valid ID/Passport</li>
                                </ul>
                            </div>

                            <!-- Contact Information -->
                            <div style="background-color: #1b1b1b; padding: 20px; border-radius: 10px; border: 1px solid #F5B754;">
                                <h3 style="color: #F5B754; font-size: 18px; margin-bottom: 15px;">Need Help?</h3>
                                <p style="color: #ffffff; margin: 5px 0;">📞 24/7 Support: +1 234 567 8900</p>
                                <p style="color: #ffffff; margin: 5px 0;">📧 Email: support@renaxcars.com</p>
                            </div>
                        </div>

                        <!-- Footer -->
                        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #F5B754;">
                            <p style="color: #F5B754; font-size: 16px; font-weight: 500;">
                                We look forward to serving you!<br>
                                <span style="color: #ffffff; font-size: 14px;">Drive Safe, Drive Happy</span>
                            </p>
                            <p style="color: #999999; font-size: 12px; margin-top: 15px;">
                                © ${new Date().getFullYear()} Renax Car Rental. All rights reserved.
                            </p>
                        </div>
                    </div>
                `
            };

            await transporter.sendMail(mailOptions);
        }

        const updateStatus = await bookingSchema.findOneAndUpdate(
            { _id: id },
            { status },
            { new: true }
        );

        res.status(200).json({
            status: "success",
            message: "Status Updated Successfully",
            data: updateStatus
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Failed to update status",
            data: error.message
        });
    }
};