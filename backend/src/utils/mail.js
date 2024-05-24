import nodemailer from "nodemailer";
import Citizen from "../models/Citizen.js";
import SupportAvailability from "../models/supportAvailability.js";

export const makeRecipients = async () => {
  try {
    const users = await Citizen.find();

    const supportAvailability = await SupportAvailability.find();
    const emergencyUsernames = users
      .filter((user) => user.healthStatus === "Emergency")
      .map((user) => user.username);
    const emergencyEmails = emergencyUsernames.map(
      (username) => `${username}@andrew.cmu.edu`,
    );

    const emergencyEmails1 = [];

    emergencyUsernames.forEach((username) => {
      const userInListB = supportAvailability.filter(
        (user) => user.username === username,
      );
      userInListB.forEach((es) => {
        emergencyEmails.push(es.email);
      });
    });

    return [...new Set(emergencyEmails)];
  } catch (error) {
    console.log(error);
  }
};

export const makeEmailBody = (response) => {
  return `
            <div className="px-5 py-5 overflow-auto">
              <p>Username: ${response.username}<p/>
              <p>Start Date: ${response.startDate}<p/>
              <p>End Date: ${response.endDate}<p/>
              <p>Phone: ${response.phone}<p/>
              <p>Email: ${response.email}<p/>              
            </div>
    `;
};

export const deliverEmail = (recipients, body) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.email",
    port: 587,
    secure: false,
    auth: {
      user: "neweradigisol@gmail.com",
      pass: "uzrtzggvykriqdnr",
    },
  });
  const mailOptions = {
    from: "neweradigisol@gmail.com",
    to: recipients,
    subject: "New Support Availability",
    html: body,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error delivering email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
