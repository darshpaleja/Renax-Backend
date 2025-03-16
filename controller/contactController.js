const contactSchema = require("../model/contactModel");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "darshpaleja7@gmail.com",
    pass: "aklbkhwnwhtffizd",
  },
});

// async function main(data) {
//     const mailOptions = {
//         from: '"🌟 Creative Innovation Team 🌟" <darshpaleja7@gmail.com>',
//         to: data.email,
//         subject: "Thank You for Contacting Creative Innovation Team! 🎯",
//         html: `
//             <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
//                 <div style="text-align: center; padding: 20px; background: linear-gradient(45deg, #2196F3, #3F51B5);">
//                     <h1 style="color: white; margin: 0;">Thank You For Reaching Out!</h1>
//                 </div>
//                 <div style="padding: 20px; background-color: #ffffff; border-radius: 10px; margin-top: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
//                     <p style="font-size: 16px; color: #333; line-height: 1.6;">
//                         Dear <strong>${data.name}</strong>,
//                     </p>
//                     <p style="font-size: 16px; color: #333; line-height: 1.6;">
//                         We have successfully received your message and are excited to assist you with your requirements.
//                     </p>
//                     <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
//                         <h3 style="color: #1976D2; margin-bottom: 10px;">Your Message Details:</h3>
//                         <p><strong>Subject:</strong> ${data.subject}</p>
//                         <p><strong>Message:</strong> ${data.message}</p>
//                     </div>
//                     <p style="font-size: 16px; color: #333; line-height: 1.6;">
//                         We're committed to providing you with exceptional service and look forward to exceeding your expectations!
//                     </p>
//                     <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
//                         <p style="font-size: 16px; color: #333;">
//                             Best Regards,<br>
//                             <strong>The Creative Innovation Team</strong><br>
//                             <em>Turning Ideas into Reality</em>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         `
//     };
//     await transporter.sendMail(mailOptions);
//     console.log("Message sent successfully");
// }

exports.postContact = async (req, res) => {
  try {
    const data = req.body;
    const contactData = await contactSchema.create(data);

    // Send confirmation email
    const mailOptions = {
      from: '"🚗 Renax Car Rental Services 🚗" <darshpaleja7@gmail.com>',
      to: data.email,
      subject: "Thank You for Contacting Renax Car Rental! 🌟",
      html: `
                <div style="font-family: 'Outfit', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1b1b1b; border-radius: 15px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);">
                    <!-- Header Section -->
                    <div style="text-align: center; padding: 30px; background: linear-gradient(45deg, #222222, #1b1b1b); border-radius: 15px 15px 0 0;">
                        <h1 style="color: #F5B754; margin: 0; font-size: 28px; font-weight: 600;">Welcome to Renax Family!</h1>
                        <p style="color: #ffffff; font-size: 16px; margin-top: 10px;">Your journey to luxury begins here.</p>
                    </div>
        
                    <!-- Main Content Section -->
                    <div style="padding: 30px;">
                        <!-- Greeting -->
                        <p style="font-size: 16px; color: #ffffff; line-height: 1.6; margin-bottom: 20px;">
                            Dear <strong style="color: #F5B754;">${
                              data.name
                            }</strong>,
                        </p>
                        <p style="font-size: 16px; color: #ffffff; line-height: 1.6; margin-bottom: 20px;">
                            Thank you for reaching out to Renax Car Rental Services. We're thrilled to assist you in finding the perfect luxury vehicle for your journey. 🌟
                        </p>
        
                        <!-- Inquiry Details -->
                        <div style="background-color: #222222; padding: 20px; border-radius: 10px; margin-bottom: 25px; border-left: 4px solid #F5B754;">
                            <h3 style="color: #F5B754; margin-bottom: 15px; font-size: 20px; font-weight: 600;">Your Inquiry Details:</h3>
                            <p style="color: #ffffff; margin: 10px 0;"><strong style="color: #F5B754;">Subject:</strong> ${
                              data.subject
                            }</p>
                            <p style="color: #ffffff; margin: 10px 0;"><strong style="color: #F5B754;">Message:</strong> ${
                              data.message
                            }</p>
                        </div>
        
                        <!-- Our Commitment Section -->
                        <h3 style="color: #F5B754; margin-top: 25px; font-size: 20px; font-weight: 600;">What to Expect Next 🕒</h3>
                        <ul style="color: #ffffff; line-height: 1.6; padding-left: 20px; list-style-type: none; margin: 0;">
                            <li style="color: #ffffff; margin-bottom: 10px;">Our team will review your inquiry within the next 12 hours</li>
                            <li style="color: #ffffff; margin-bottom: 10px;">A personal rental advisor will contact you to discuss your requirements</li>
                            <li style="color: #ffffff; margin-bottom: 10px;">You'll receive a customized quote tailored to your preferences</li>
                            <li style="color: #ffffff; margin-bottom: 10px;">We'll guide you through the entire rental process</li>
                        </ul>
        
                        <!-- What to Expect Section -->
                        <h3 style="color: #F5B754; margin-top: 25px; font-size: 20px; font-weight: 600;">What to Expect Next 🕒</h3>
                        <ul style="color: #ffffff; line-height: 1.6; padding-left: 20px; list-style-type: none; margin: 0;">
                            <li style="color: #ffffff; margin-bottom: 10px;">Our team will review your inquiry within the next 12 hours</li>
                            <li style="color: #ffffff; margin-bottom: 10px;">A personal rental advisor will contact you to discuss your requirements</li>
                            <li style="color: #ffffff; margin-bottom: 10px;">You'll receive a customized quote tailored to your preferences</li>
                            <li style="color: #ffffff; margin-bottom: 10px;">We'll guide you through the entire rental process</li>
                        </ul>
        
                        <!-- Explore Services Section -->
                        <div style="background-color: #222222; padding: 20px; border-radius: 10px; margin: 25px 0;">
                            <h3 style="color: #F5B754; margin-bottom: 15px; font-size: 20px; font-weight: 600;">Explore Our Premium Services 🚘</h3>
                            <ul style="color: #ffffff; line-height: 1.6; padding-left: 20px;">
                                <li>Luxury and Sports Car Fleet</li>
                                <li>Professional Chauffeur Services</li>
                                <li>Airport Transfers</li>
                                <li>Long-term Rental Options</li>
                                <li>Corporate Rental Solutions</li>
                            </ul>
                        </div>
        
                        <!-- Contact Information Section -->
                        <div style="background-color: #222222; padding: 20px; border-radius: 10px; margin: 25px 0; border: 1px solid #F5B754;">
                            <h3 style="color: #F5B754; margin-bottom: 15px; font-size: 20px; font-weight: 600;">Need Immediate Assistance? 📞</h3>
                            <p style="color: #ffffff; margin: 5px 0;">📱 24/7 Hotline: +1 234 567 8900</p>
                            <p style="color: #ffffff; margin: 5px 0;">📧 Email: support@renaxcars.com</p>
                            <p style="color: #ffffff; margin: 5px 0;">🏢 Visit us: 123 Luxury Drive, City Center</p>
                            <p style="color: #ffffff; margin: 5px 0;">⏰ Business Hours: 24/7 Available</p>
                        </div>
        
                        <!-- Closing Message -->
                        <p style="font-size: 16px; color: #ffffff; line-height: 1.6; margin-top: 25px;">
                            We're excited to help you experience luxury driving at its finest!
                        </p>
        
                        <!-- Footer Section -->
                        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #F5B754; text-align: center;">
                            <p style="font-size: 16px; color: #ffffff;">
                                Best Regards,<br>
                                <strong style="color: #F5B754;">The Renax Car Rental Team</strong><br>
                                <em>Luxury Driving Experience</em>
                            </p>
                            <p style="font-size: 12px; color: #999999; margin-top: 15px;">
                                This is an automated response. Please do not reply to this email.<br>
                                © ${new Date().getFullYear()} Renax Car Rental. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      status: "success",
      message: "Contact created successfully and confirmation email sent",
      data: contactData,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Failed to create contact",
      Error: error.message,
    });
  }
};

exports.getUserContact = async (req, res) => {
  try {
    const id = req.params.userId;
    const contactData = await contactSchema
      .find({ userId: id })
      .populate("userId");
    res.status(200).json({
      status: "success",
      message: "Contact Get Successfully",
      data: contactData,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Fail to get userContact",
      Error: error.message,
    });
  }
};
