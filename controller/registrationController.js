const userSchema = require('../model/registrationModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "darshpaleja7@gmail.com",
      pass: "aklbkhwnwhtffizd"
    }

});

async function main(userEmail, userName) {
    const emailTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Renax</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
            
            * { margin: 0; padding: 0; box-sizing: border-box; }
            
            body { 
                font-family: 'Outfit', sans-serif; 
                background-color: #f4f4f4; 
                line-height: 1.6;
            }
            
            .container { 
                max-width: 600px; 
                margin: 0 auto; 
                padding: 20px;
            }
            
            .email-wrapper { 
                background-color: #1b1b1b; 
                border-radius: 15px; 
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            
            .header { 
                background-color: #F5B754; 
                padding: 30px; 
                text-align: center;
            }
            
            .logo { 
                font-size: 32px; 
                font-weight: 600; 
                color: #1b1b1b;
                margin-bottom: 5px;
            }
            
            .content { 
                padding: 40px 30px; 
                color: #fff;
            }
            
            .welcome-text { 
                font-size: 28px; 
                font-weight: 500; 
                color: #F5B754;
                margin-bottom: 20px;
                text-align: center;
            }
            
            .message { 
                color: #999; 
                font-size: 16px;
                margin-bottom: 30px;
                text-align: center;
            }

            .feature-section {
                background-color: #222222;
                border-radius: 15px;
                padding: 25px;
                margin: 30px 0;
            }

            .feature-title {
                color: #F5B754;
                font-size: 20px;
                font-weight: 500;
                margin-bottom: 15px;
                text-align: center;
            }

            .feature-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
                margin-bottom: 20px;
            }

            .feature-item {
                display: flex;
                align-items: center;
                color: #999;
                font-size: 14px;
                padding: 10px;
            }

            .feature-icon {
                width: 40px;
                height: 40px;
                margin-right: 10px;
                background-color: #1b1b1b;
                border-radius: 50%;
                display: flex;
                align-items: center !important;
                justify-content: center !important;
            }

            .car-showcase {
                margin: 30px 0;
                text-align: center;
            }

            .car-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
                margin-top: 20px;
            }

            .car-item {
                background-color: #222222;
                border-radius: 10px;
                overflow: hidden;
            }

            .car-img {
                width: 100%;
                height: auto;
                display: block;
            }

            .car-details {
                padding: 15px;
                color: #999;
                font-size: 14px;
            }

            .cta-button {
                display: inline-block;
                background-color: #F5B754;
                color: #1b1b1b !important;
                padding: 15px 30px;
                border-radius: 25px;
                text-decoration: none;
                font-weight: 500;
                margin: 20px 0;
            }

            .footer {
                text-align: center;
                padding: 30px;
                background-color: #222222;
                color: #999;
            }

            .social-links {
                margin-top: 20px;
            }

            .social-links a {
                color: #F5B754;
                margin: 0 10px;
                text-decoration: none;
            }

            .contact-info {
                margin-top: 20px;
                font-size: 14px;
                color: #999;
            }

            @media only screen and (max-width: 600px) {
                .container { padding: 10px; }
                .content { padding: 30px 20px; }
                .feature-grid { grid-template-columns: 1fr; }
                .car-grid { grid-template-columns: 1fr; }
                .welcome-text { font-size: 24px; }
                .message { font-size: 14px; }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="email-wrapper">
                <div class="header">
                    <div class="logo">RENAX</div>
                    <div style="color: #1b1b1b;">Luxury Car Rental</div>
                </div>
                
                <div class="content">
                    <div class="welcome-text">Welcome to Renax, ${userName}! 🎉</div>
                    
                    <div class="message">
                        Thank you for choosing Renax - Your Premium Car Rental Service. 
                        We're thrilled to have you join our community of luxury car enthusiasts.
                    </div>

                    <div class="feature-section">
                        <div class="feature-title">Your Premium Benefits</div>
                        <div class="feature-grid">
                            <div class="feature-item"  style="display: flex; align-items: center;">
                                <div class="feature-icon" style="width: 40px; height: 40px; background-color: #1b1b1b; border-radius: 50%; display: flex; align-items: center; justify-content: center;">🚗</div>
                                <div>Access to Luxury Fleet</div>
                            </div>
                            <div class="feature-item" style="display: flex; align-items: center;">
                                <div class="feature-icon" style="width: 40px; height: 40px; background-color: #1b1b1b; border-radius: 50%; display: flex; align-items: center; justify-content: center;">💎</div>
                                <div>Premium Service</div>
                            </div>
                            <div class="feature-item" style="display: flex; align-items: center;">
                                <div class="feature-icon" style="width: 40px; height: 40px; background-color: #1b1b1b; border-radius: 50%; display: flex; align-items: center; justify-content: center;">🎁</div>
                                <div>Special Member Offers</div>
                            </div>
                            <div class="feature-item" style="display: flex; align-items: center;">
                                <div class="feature-icon" style="width: 40px; height: 40px; background-color: #1b1b1b; border-radius: 50%; display: flex; align-items: center; justify-content: center;">🔒</div>
                                <div>Secure Booking</div>
                            </div>
                        </div>
                    </div>

                    <div class="car-showcase">
                        <div class="feature-title">Featured Luxury Cars</div>
                        <div class="car-grid">
                            <div class="car-item">
                                <img src="https://duruthemes.com/demo/html/renax/dark/img/cars/1.jpg" alt="Luxury Car 1" class="car-img">
                                <div class="car-details">
                                    <strong>Mercedes S-Class</strong><br>
                                    Premium Luxury Sedan
                                </div>
                            </div>
                            <div class="car-item">
                                <img src="https://duruthemes.com/demo/html/renax/dark/img/cars/2.jpg" alt="Luxury Car 2" class="car-img">
                                <div class="car-details">
                                    <strong>BMW 7 Series</strong><br>
                                    Executive Luxury
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style="text-align: center;">
                        <a href="http://localhost:3000/login" class="cta-button">Login to Your Account</a>
                    </div>

                    <div class="feature-section">
                        <div class="feature-title">What's Next?</div>
                        <div style="color: #999; font-size: 14px; line-height: 1.8;">
                            1. Login to your account<br>
                            2. Browse our luxury fleet<br>
                            3. Choose your perfect vehicle<br>
                            4. Book your first rental<br>
                            5. Enjoy the premium experience
                        </div>
                    </div>
                </div>

                <div class="footer">
                    <div style="font-size: 18px; color: #F5B754; margin-bottom: 10px;">
                        Renax Luxury Car Rentals
                    </div>
                    <div class="contact-info">
                        📍 Dubai, Water Tower, Office 123<br>
                        📞 +1 234 567 890<br>
                        📧 support@renax.com
                    </div>
                    <div class="social-links">
                        <a href="#">Facebook</a>
                        <a href="#">Instagram</a>
                        <a href="#">Twitter</a>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>`;

    await transporter.sendMail({
        from: '"Renax Car Rental" darshpaleja7@gmail.com',
        to: userEmail,
        subject: "Welcome to Renax - Your Premium Car Rental Experience Begins!",
        html: emailTemplate
    });
}

exports.createUser = async (req, res) => {
    try {
        const data = req.body;
        if (!data.name || !data.phone || !data.email || !data.password)
            throw new Error('All fields are required');
        if (!data.email.includes('@gmail.com'))
            throw new Error('Invalid Email');
        let userData = await userSchema.findOne({ email: data.email });
        if (userData) throw new Error('User Already Exists');
        if (data.password.length < 8 || !data.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/))
            throw new Error('Password must contain lowercase, uppercase, number, and special character');
        const phone = Number(data.phone);
        if (isNaN(phone) || phone < 1000000000 || phone > 9999999999 || !Number.isInteger(phone))
            throw new Error('Please enter a valid 10-digit phone number');
        data.phone = phone;
        data.password = await bcrypt.hash(data.password, 10);
        const newUser = await userSchema.create({
            name: data.name,
            phone: data.phone,
            email: data.email,
            password: data.password,
            fcmToken: data.fcmToken
        });
        await main(data.email, data.name);
        res.status(200).json({ status: "success", message: "User created successfully", data: newUser });
    } catch (error) {
        res.status(400).json({ status: "Fail", message: "Fail to create user", error: error.message });
    }
};



exports.getUser = async (req, res) => {

    try {
        let userData = await userSchema.find()
        res.status(200).json({
            status: 'Success',
            Message: 'User Get Successfully',
            Data: userData
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            Message: error.message
        })
    }
}

exports.getUserById = async (req, res) => {

    const id = req.params.id
    try {
        let user = await userSchema.findOne({ _id: id })
        res.status(200).json({
            status: 'Success',
            Message: 'User Get Successfully',
            Data: user
        })

    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            Message: error.message
        })
    }
}

// Login
exports.loginUser = async (req, res) => {

    try {

        if (req.body.email === '' || req.body.password === '')
            throw new Error('All fields are required')

        let loginData = await userSchema.findOne({ email: req.body.email })
        if (!loginData) throw new Error('User Not Found')

        let verifyPassword = await bcrypt.compare(req.body.password, loginData.password)
        if (!verifyPassword) throw new Error('Invalid Password')

        let token = jwt.sign({ id: loginData._id, name: loginData.name }, process.env.SECRET_KEY)

        res.status(200).json({
            status: 'Success',
            Message: 'User Login Success',
            Data: loginData,
            token
        })

    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            Message: error.message
        })
    }
}