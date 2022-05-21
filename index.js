//import modules installed at the previous step. We need them to run Node.js server and send emails
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

// create a new Express application instance
const app = express();

//configure the Express middleware to accept CORS requests and parse request body into JSON
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(express.json());

//start application server on port 3000
app.listen(3000, () => {
  console.log("The server started on port 3000");
});

app.get("/", (req, res) => {
  res.send("Working fine");
});

// define a sendmail endpoint, which will send emails and response with the corresponding status
app.post("/sendmail", (req, res) => {
  console.log("request came");
  let data = req.body;
  sendMail(data, (err, info) => {
    if (err) {
      console.log(err);
      res.status(400);
      res.send({ error: "Failed to send email" });
    } else {
      console.log("Email has been sent");
      res.send(info);
    }
  });
});

const sendMail = async (user, callback) => {
  console.log(process.env.SMTP_USERNAME);
  console.log(process.env.SMTP_PASSWORD);
  const transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: "465",
    secure: true,
    requireTLS: true,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: "parthjetani2019@gmail.com",
    to: "Sales@inextiot.com",
    subject: "Service Request",
    html: "New service request has been generated.",
  };

  transporter.sendMail(mailOptions, callback);
};
