const Token = require('../models/token.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto')
const nodemailer = require('nodemailer');
const constants = require('../utils/constants');
const serverConfig = require('../configs/server.config')

// Generate a random token
function generateToken() {
    return crypto.randomBytes(20).toString('hex');
}

// Store the token in the database for the user
async function storeToken(email, token, expires) {
    await Token.create({ email, token, expires });
}

// Deactivate the token in the database for the user
async function deactivateToken(email, token) {
    await Token.deleteOne({ email, token });
}

// Check if a token is valid for the user
async function isTokenValid(email, token) {
    const tokenDoc = await Token.findOne({ email, token });
    if (!tokenDoc) {
        return false;
    }

    const now = new Date();
    if (now.getTime() > tokenDoc.expires.getTime()) {
        await Token.deleteOne({ email, token });
        return false;
    }

    return true;
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aamirfreelance040@gmail.com', // Your Gmail address
        pass: 'ghfuuvbnayouugzn', // Your Gmail password
    },
});

exports.forgot = async (req, res) => {
    const { email } = req.body;
    try {
        // Check if the user with the specified email exists
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: 'User not found' });
            return;
        }
        // Generate a random token
        const token = generateToken();
        // Store the token in the database
        const expires = Date.now() + 86400000;
        console.log(`${serverConfig.BASE_URL}/reset-password?email=${email}&token=${token}`)
        await storeToken(email, token, expires);
        // Generate a reset password link with the token encoded in the URL
        const resetLink = `${serverConfig.BASE_URL}/crm/api/v1/reset-password?email=${email}&token=${token}`;
        // Send the reset password link to the user via email
        const mailOptions = {
            from: 'aamirfreelance040@gmail.com',
            to: email,
            subject: 'Reset your password',
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
        };
        await transporter.sendMail(mailOptions);
        console.log("hello1")

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.resetPassword = async (req, res) => {
    const { email, token, password } = req.body;

    try {
        // Check if the token is valid for the user
        if (!await isTokenValid(email, token)) {
            res.status(400).json({ message: 'Invalid or expired token' });
            return;
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update the user's password in the database
        await User.updateOne({ email }, { password: hashedPassword });

        // Deactivate the token in the database
        await deactivateToken(email, token);

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};