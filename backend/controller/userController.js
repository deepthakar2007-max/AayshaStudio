const User = require("./../model/usermodel");
const bcrypt = require("bcryptjs");


// =====================================
// GET MY PROFILE
// =====================================

const getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        console.error("Get Profile Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch profile",
            error: error.message
        });
    }
};


// =====================================
// UPDATE MY PROFILE
// =====================================

const updateProfile = async (req, res) => {
    try {

        const {
            name,
            phone,
            address,
            profileImage
        } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }


        // Update name
        if (name !== undefined) {
            if (!name.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "Name cannot be empty"
                });
            }

            user.name = name.trim();
        }


        // Update phone
        if (phone !== undefined) {
            user.phone = phone;
        }


        // Update address
        if (address !== undefined) {
            user.address = address;
        }


        // Update profile image
        if (profileImage !== undefined) {
            user.profileImage = profileImage;
        }


        const updatedUser = await user.save();


        res.status(200).json({
            success: true,
            message: "Profile updated successfully",

            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                address: updatedUser.address,
                profileImage: updatedUser.profileImage,
                role: updatedUser.role,
                isOnline: updatedUser.isOnline,
                lastLoginAt: updatedUser.lastLoginAt
            }
        });

    } catch (error) {

        console.error("Update Profile Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update profile",
            error: error.message
        });
    }
};


// =====================================
// CHANGE PASSWORD
// =====================================

const changePassword = async (req, res) => {
    try {

        const {
            currentPassword,
            newPassword
        } = req.body;


        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Current password and new password are required"
            });
        }


        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: "New password must be at least 6 characters"
            });
        }


        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }


        const passwordMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );


        if (!passwordMatch) {
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect"
            });
        }


        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );


        user.password = hashedPassword;

        await user.save();


        res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });

    } catch (error) {

        console.error("Change Password Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to change password",
            error: error.message
        });
    }
};


module.exports = {
    getProfile,
    updateProfile,
    changePassword
};  