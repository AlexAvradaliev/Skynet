const nodemailer = require('nodemailer');

exports.sendEmail = async (email,type,template) => {
    console.log('clientId' + ''+ process.env.NODEMAILER_CLIENT_ID,)
    console.log('clientSecret' + ''+ process.env.NODEMAILER_CLIENT_SECRET,)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.NODEMAILER_AUTH_USER,
          pass: process.env.NODEMAILER_AUTH_PASS
        }
    })

    let mailOptions = {
        from: `${process.env.BRAND}  <${process.env.NODEMAILER_SENDER_EMAIL}>`,
        to: email,
        subject: `${type}`,
        html: template,
    }

    return await transporter.sendMail(mailOptions)
    .then(() => console.log('success'))
    .catch(err => console.log(err))
};
