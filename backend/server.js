const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;

    let transporter = nodemailer.createTransport({
        host: 'smtp.yandex.com',
        port: 465,
        secure: true,
        auth: {
            user: 'poetrychallenge@yandex.com', // Your Yandex email
            pass: process.env.EMAIL_PASSWORD // App-specific password from Yandex
        }
    });

    let mailOptions = {
        from: 'poetrychallenge@yandex.com',
        to: to,
        subject: subject,
        text: text
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent: ' + info.response);
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});