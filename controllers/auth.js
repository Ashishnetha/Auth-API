const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { generateAuthToken, generateResetToken, verifyResetToken } = require("../utils/generateToken");
const { sendPasswordResetEmail } = require("../utils/email");

//do i need to create a separate .ejs file for resetting the password or can i use the same login.ejs file and add a form for resetting the password?
//It is generally a good practice to create a separate .ejs file for resetting the password, as it helps to keep the code organized and maintainable. You can create a new file called reset-password.ejs and add a form for resetting the password there. This way, you can keep the login functionality separate from the password reset functionality, making it easier to manage and update in the future.
const secret = process.env.JWT_SECRET;

exports.getSignIn = (req, res) => {
    res.render("sign-in");
}
//after sign-in user will be get to see a message from index.ejs file 

exports.postSignIn = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
    {
        return res.status(401).json({ error: "email and password are required" });
    }
    const existing = await User.findOne({ email });
    if (existing)
    {
        return res.status(401).json({ error: "email already exists" });
    }
    const user = await User.create({
        email,
        password
    });
    const token = generateAuthToken(user._id);
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.render("index");
}

exports.getLogin = (req, res) => {
    res.render("login");
}

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
    {
        return res.status(401).json({ error: "email and password are required" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password)))
    {
        return res.status(401).json({ error: "invalid email or password" });
    }
    const token = generateAuthToken(user._id);
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.render("index");
}

exports.logout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
}

exports.getforgotPassword = (req, res) => {
    res.render("forgot",{message:null,error:null});
}

exports.postforgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.render("forgot", { error: "Email is required", message: null });
    }

    const user = await User.findOne({ email });

    // Same message whether found or not — don't reveal user existence
    if (!user) {
        return res.render("forgot", {
            message: "If that email is registered, a reset link has been sent.",
            error: null,
        });
    }

    const resetToken = generateResetToken(user._id);

    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

    await sendPasswordResetEmail(user.email, resetUrl);

    res.render("forgot", {
        message: "If that email is registered, a reset link has been sent.",
        error: null,
    });
};

exports.getResetPassword = (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.render("reset", {
            error: "Invalid or missing reset link.",
            token: null,
        });
    }

    try {
        verifyResetToken(token);  // just check it's valid, don't use userId yet
        res.render("reset", { token, error: null });
    } catch (err) {
        res.render("reset", {
            error: "Reset link is invalid or expired. Please request a new one.",
            token: null,
        });
    }
};

exports.postResetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.render("reset", {
            error: "Token and new password are required.",
            token,
        });
    }

    if (newPassword.length < 8) {
        return res.render("reset", {
            error: "Password must be at least 8 characters.",
            token,
        });
    }

    try {
        const userId = verifyResetToken(token);  // ✅ throws caught here

        const user = await User.findById(userId);
        if (!user) {
            return res.render("reset", {
                error: "User not found.",
                token: null,
            });
        }

        user.password = newPassword;
        await user.save();

        res.redirect("/login");

    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.render("reset", {
                error: "Reset link has expired. Please request a new one.",
                token: null,    
            });
        }
        res.render("reset", {
            error: "Invalid or expired link.",
            token: null,
        });
    }
};