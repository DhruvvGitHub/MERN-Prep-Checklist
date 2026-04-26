const express = require("express")
const { login, register, logout } = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const router = express.Router()

// Public routes (no middleware needed)
router.post("/login", login)
router.post("/register", register)

// Protected routes (middleware required)
router.get("/profile", authMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        message: "User profile",
        user: req.user
    })
})

router.post("/logout", authMiddleware, logout)

module.exports = router;