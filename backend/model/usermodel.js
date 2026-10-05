const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
        },
        
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },

        isOnline: {
            type: Boolean,
            default: false,
        },

        lastLoginAt: {
            type: Date,
        },
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;