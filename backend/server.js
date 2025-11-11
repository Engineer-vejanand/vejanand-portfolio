const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
// const nodemailer = require("nodemailer");
const Contact = require("./models/Contact");

const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

dotenv.config();
const app = express();

const ALLOWED_ORIGIN = process.env.NODE_ENV === 'production' 
    ? 'https://vejanand-portfolio-1.onrender.com'
    : 'http://localhost:5173';

app.use(cors({
origin: ALLOWED_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());

// ✅ Database Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is up and running! Use the /contact POST route." });
});
// ✅ Contact Form Route
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save to DB
    const contact = new Contact({ name, email, message });
    await contact.save();

    // Send email notification
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.EMAIL,
    //     pass: process.env.EMAIL_PASS,
    //   },
    // });



    const emailHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
              
              <!-- Header: Accent Color (Amber/Gold) -->
              <div style="background-color: #D97706; color: white; padding: 20px 25px; text-align: center;">
                  <h1 style="margin: 0; font-size: 24px;">&#128233; New Portfolio Contact</h1>
              </div>

              <!-- Body -->
              <div style="padding: 25px;">
                  <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
                      A new message has been submitted on your website. Here are the details:
                  </p>

                  <!-- Detail Card -->
                  <div style="background-color: #fefce8; border: 1px solid #fde68a; padding: 15px; border-radius: 6px;">
                      <p style="margin: 0 0 10px 0; font-size: 14px;">
                          <strong style="color: #D97706;">Name:</strong> ${name}
                      </p>
                      <p style="margin: 0 0 0 0; font-size: 14px;">
                          <strong style="color: #D97706;">Email:</strong> <a href="mailto:${email}" style="color: #D97706; text-decoration: none;">${email}</a>
                      </p>
                  </div>

                  <!-- Message Content -->
                  <h3 style="font-size: 18px; color: #333; margin-top: 25px; margin-bottom: 10px; border-bottom: 2px solid #eee; padding-bottom: 5px;">
                      Message:
                  </h3>
                  <div style="background-color: #fff; border: 1px solid #ccc; padding: 15px; border-left: 5px solid #D97706; border-radius: 4px; white-space: pre-wrap;">
                      <p style="margin: 0; color: #555;">${message}</p>
                  </div>

                  <!-- Call to Action / Footer -->
                  <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                      <a href="mailto:${email}" style="display: inline-block; background-color: #D97706; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold; font-size: 16px;">
                          &#9993;&#65039; Click here to Reply to ${name}
                      </a>
                      <p style="margin-top: 15px; font-size: 12px; color: #999;">
                          Confirmation: Message saved in MongoDB's Contact collection.
                      </p>
                  </div>
              </div>
          </div>
      </div>
    `;

    console.log("📨 Trying to send email...");


const response= await resend.emails.send({
  from: `Portfolio <${process.env.SENDEMAIL}>`,
  to: process.env.EMAIL,
  reply_to: email,
  subject: `New Portfolio Message from ${name}`,
  html: emailHtml,
});

  console.log("✅ Resend Email Sent:", response);

    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("Contact Form Submission Error:", err); // Log the error
    res.status(500).json({ success: false, message: "Server Error: Could not process message." });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`✅ Server running on port ${process.env.PORT}`)
);