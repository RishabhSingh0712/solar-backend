const User = require("../models/userModel");
const verificationStore = require('../utils/verificationstore'); // Import the verification store
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { emitLogin,emitLogout } = require('../utils/socket');
const { emit } = require("nodemon");
//verify email 
const verifyEmail = asyncHandler(async (req, res) => {
    try {
        const { email, token } = req.body;

        // Retrieve the stored verification details
        const storedData =await verificationStore.get(email);
        console.log(`storedData.first_name: ${storedData.first_name}`);
        if (!storedData) {
            console.log("Stored data not found for email:", email);
            return res.status(400).json({ status: 'fail', message: 'Verification details not found' });
        } else {
            console.log(`Found stored data for email ${email}:`, storedData);
        }
        
        // Check if the token matches and hasn't expired
        const isTokenValid = storedData.verificationToken === token;
        const isTokenExpired = storedData.tokenExpiry < Date.now();

        if (isTokenExpired) {
            return res.status(401).json({
                status: 'fail',
                message: 'Verification token has expired'
            });
        }

        if (!isTokenValid) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid verification token'
            });
        }

        // If verified, create the user
        const newUser = await User.create({
            first_name: storedData.first_name,
            last_name: storedData.last_name,
            mobile: storedData.mobile,
            email,
            password: storedData.password,
            role: storedData.role,
            isVerified: true
        });

        // Remove the verification details from the store
        verificationStore.delete(email);

        res.status(200).json({
            status: 'success',
            message: 'Email verified and user created successfully',
            user: newUser
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message
        });
    }
});


const loginController = asyncHandler(async (req, res,) => {
    try {    
        const { email, password } = req.body;
        console.log(req.body)
        const user = await User.findOne({ email });
       
        if (!user) {
            return res.status(401).json({ status: 'fail', message: 'User not found' });
        }
        if (!user.isVerified) {
            return res.status(401).json({ status: 'fail', message: 'User is not verified' });
        }
        console.log("Stored Password in DB:", user.password); // Debugging

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("Password Match Status:", isPasswordValid); // Debugging
       
        if (!isPasswordValid) {
            return res.status(401).json({ status: 'fail', message: 'Invalid password' });
        }        
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
         // Remove password from user object before sending response
         delete user.password;
       
        emitLogin({user_id:user._id,user_email:user.email,user_role:user.role});
        res.status(200).json({ status: 'success', message: 'User logged in successfully', user, token });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error', error: error.message });        
    }
});


const logoutController = asyncHandler(async (req, res) => {
    try {


        console.log('request user :', req.user)
    //   if (!req.user._id) {
    //     return res.status(401).json({ status: 'fail', message: 'Unauthorized' });
    //   }
      const userId = req.user._id;
      console.log('for logout method userId:', userId);
      // Emit a logout event to the socket
      if (userId) {
    
        res.status(200).json({ status: 'success', message: 'User logged out successfully' ,user:req.user});
      } else {
        console.log('userId not found', userId);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  });

  const getAllUsers = asyncHandler(async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json({ status: 'success', message: 'Users fetched successfully', users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  })


  const userVerification = asyncHandler(async (req, res) => {
      try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({ status: 'fail', message: 'User not found' });
        }
      
    else{
            return res.status(200).json({ status: 'success', message: 'User found',user:user.email });
        }
       
      } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error', error: error.message });
      }
  });


  const changePassword = asyncHandler(async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        if (!password || !confirmPassword) {
            return res.status(400).json({ status: 'fail', message: 'Please provide both password and confirmPassword' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ status: 'fail', message: 'Password and confirm password do not match.' });
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                status: 'fail',
                message: 'Password must be at least 6 characters long, contain at least one number and one special character.'
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: 'fail', message: 'User not found.' });
        }

        // Do not hash here; assign the plain password.
        user.password = password;
        await user.save();

        res.status(200).json({ status: 'success', message: 'Password changed successfully.' });
    } catch (error) {
        console.error("Error in changePassword:", error);
        res.status(500).json({ status: 'error', message: 'Internal server error', error: error.message });
    }
});


  
module.exports = {verifyEmail,loginController,logoutController,getAllUsers,userVerification,changePassword};