const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "email.cobalt.system@gmail.com",
    pass: "rvpk vtvj tgfx jzxa",
  },
});

module.exports = transporter;