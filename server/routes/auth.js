const express = require("express")
const router = express.Router()

router.post("/login", loginController)
router.post("/register", registerController)