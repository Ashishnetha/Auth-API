const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const SECRET = process.env.JWT_SECRET;
const RESET_TOKEN_SECRET = process.env.RESET_TOKEN_SECRET;

//regular auth token for login sessions
function generateAuthToken(userId) {
    return jwt.sign({ userId }, SECRET, { expiresIn: "7d" });
}

//Reset token for password reset — separate secret, short expiry
function generateResetToken(userId) {
    return jwt.sign({ userId }, RESET_TOKEN_SECRET, { expiresIn: "15m" });
}

//verifies reset token and returns userId if valid, else null
function verifyResetToken(token) {
    try {
        const decoded = jwt.verify(token, RESET_TOKEN_SECRET);
        return decoded.userId;
    } catch (err) {
        return null;
    }
}

module.exports = { generateAuthToken, generateResetToken, verifyResetToken };

