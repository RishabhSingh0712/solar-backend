const express = require('express');
require('dotenv').config();
const nodemailer = require('nodemailer');
const User = require('../models/userModel'); // Import the User model
const { body, validationResult } = require('express-validator');
const validator = require('validator');
const verificationStore = require('../utils/verificationstore'); // Import the verification store
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
    requireTLS: true,
    auth: {
        user: process.env.SMTP_MAIL, // Your email address
        pass: process.env.SMTP_PASS   // Your email password or app-specific password
    }
});



const validateAndSendVerificationEmail = [
   
    body('email').isEmail().withMessage('Must be a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('mobile').isLength({ min: 10 }).withMessage('Mobile number must be at least 10 digits'),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'fail',
                errors: errors.array()
            });
        }
                   
        const { email, password, first_name, last_name, mobile,role } = req.body;

          // 1. Validate email format
    if (!validator.isEmail(email)) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid email address format'
        });
    }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: 'fail',
                message: 'User already exists'
            });
        }

        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationTokenExpires = Date.now() + 5 * 60 * 1000; // 5 minutes

        const mailOptions = {
            from: 'manojku0308@gmail.com',
            to: email,
            subject: 'Email Verification',
            text: `Your verification code is ${verificationToken}. It will expire in 5 minutes.`
        };

        try {
            await transporter.sendMail(mailOptions);

            // Store verification details temporarily
            verificationStore.set(email, {
                first_name,
                last_name,
                mobile,
                role,
                verificationToken,
                tokenExpiry: verificationTokenExpires,
                password
            });
            console.log(verificationStore)

            res.status(200).json({
                status: 'success',
                message: 'Verification email sent'
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: 'Failed to send verification email',
                error: error.message
            });
        }
    }
];

module.exports = { validateAndSendVerificationEmail};