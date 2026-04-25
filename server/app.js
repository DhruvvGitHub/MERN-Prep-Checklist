require("dotenv").config()

const express = require("express")
const cors = require("cors");
const connectDB = require("./database/db");
const authRoutes = require("./routes/auth")

const app = express();

// Connect to Database
connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// routes
app.use("/api/auth", authRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running");
})