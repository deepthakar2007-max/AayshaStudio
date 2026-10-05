const express = require("express");

const router = express.Router();

const {
    getProfile,
    updateProfile,
    changePassword
} = require("./../controllers/userController");

const authMiddleware = require("./../middleware/authMiddleware");


// =====================================
// GET PROFILE
// =====================================

router.get(
    "/profile",
    authMiddleware,
    getProfile
);


// =====================================
// UPDATE PROFILE
// =====================================

router.put(
    "/profile",
    authMiddleware,
    updateProfile
);


// =====================================
// CHANGE PASSWORD
// =====================================

router.put(
    "/change-password",
    authMiddleware,
    changePassword
);


module.exports = router;