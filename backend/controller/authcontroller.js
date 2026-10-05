const User = require("./../model/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



// =========================
// REGISTER
// =========================

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "Registration successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Register Error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// =========================
// LOGIN
// =========================

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.status(200).json({
            message: "Login successful",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Login Error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// =========================
// GET USERS
// =========================

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            users
        });

    } catch (error) {
        console.error("Get Users Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch users"
        });
    }
};
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser =
            await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            message: "User deleted successfully",
        });

    } catch (error) {
        console.error("Delete User Error:", error);

        res.status(500).json({
            message: "Failed to delete user",
            error: error.message,
        });
    }
};

// =========================
// EXPORT
// =========================

module.exports = {

    register,
    login,
    getUsers,
    deleteUser
};