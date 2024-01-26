import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";
import Event from "../models/Event.js";
configDotenv();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});

export const SendWelcomeMail = async (name, email) => {
  try {
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "Registration",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to CCA</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
        
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              border-radius: 8px;
              margin-top: 20px;
            }
        
            h1 {
              color: #333;
            }
        
            p {
              color: #555;
            }
            .logo{
                border:1px solid black;
                width:100%;
                height:100%;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Welcome to CCA!</h1>
            <br/>
          
            <p>Dear ${name},</p>
            <p>Thank you for registering with us. We are excited to have you on board. Explore our platform and enjoy the benefits of being a part of our community.</p>
            <p>If you have any questions or need assistance, feel free to reach out to us.</p>
            <br/>
            <p>Best regards,</p>
            <p>The CCA Team</p>
          </div>
        </body>
        </html>
        
        
          `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Email sent: " + info.response);
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const SendActivationMail = async (name, email) => {
  try {
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "Account Activation",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Canada Cleaning Association</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
        
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              border-radius: 8px;
              margin-top: 20px;
            }
        
            h1 {
              color: #333;
            }
        
            p {
              color: #555;
            }
            .logo{
                border:1px solid black;
                width:100%;
                height:100%;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Hurray!</h1>
            <br/>
          
            <p>Dear ${name},</p>
            <p>Your account is Active now </p>
            <p>You can now login and list your businesses. </p>
            <br/>
            <p>Best regards,</p>
            <p>The CCA Team</p>
          </div>
        </body>
        </html>
        
        
          `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Email sent: " + info.response);
    });
  } catch (error) {
    console.log(error.message);
  }
};

const sendEmailNotification = async (event, user) => {
  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: user.email,
    subject: "Event Notification",
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Canada Cleaing Association</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f5f5f5;
        }
    
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          margin-top: 20px;
        }
    
        h1 {
          color: #333;
        }
    
        p {
          color: #555;
        }
        .logo{
            border:1px solid black;
            width:100%;
            height:100%;
        }
      </style>
    </head>
    <body>
      <div class="container">
        
        <p>Hello ${user.email},\n\nYou have an upcoming event: ${event.name} on ${event.date}. Don't miss it!</p>
        <br/>
        
      </div>
    </body>
    </html>`,
    // text: `Hello ${user.userId},\n\nYou have an upcoming event: ${event.name} on ${event.date}. Don't miss it!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${user.email}`);
  } catch (error) {
    console.error(`Error sending email to ${user.email}: ${error.message}`);
  }
};

// Function to check and send email notifications
const checkAndSendNotifications = async () => {
  console.log("checkAndSendNotifications");
  const oneWeekBefore = new Date();
  oneWeekBefore.setDate(oneWeekBefore.getDate() + 7);

  const threeDaysInterval = new Date();
  threeDaysInterval.setDate(threeDaysInterval.getDate() + 3);

  try {
    const events = await Event.find({
      date: { $gte: new Date(), $lt: oneWeekBefore },
      $or: [
        { "registeredUsers.eventNotification": "YES" },
        {
          "registeredUsers.eventNotification": "MAYBE",
          date: { $lt: oneWeekBefore },
        },
      ],
    });

    events.forEach(async (event) => {
      event.registeredUsers.forEach((user, index) => {
        if (user.eventNotification === "YES") {
          sendEmailNotification(event, user.user);
        } else if (user.eventNotification === "MAYBE" && index % 2 === 0) {
          sendEmailNotification(event, user.user);
        }
      });
    });
  } catch (error) {
    console.error(`Error retrieving events: ${error.message}`);
  }
};
// checkAndSendNotifications();
// Schedule the function to run every 3 days
setInterval(checkAndSendNotifications, 1000 * 60 * 60 * 24 * 3);
