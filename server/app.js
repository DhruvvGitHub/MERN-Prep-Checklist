require("dotenv").config()

const express = require("express")
const cors = require("cors");
const connectDB = require("./database/db");

const app = express();

// Connect to Database
connectDB()

// Middleware
app.use(cors())
app.use(express.json())

app.get("/test", (req, res) => {
    res.send("Server is working")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running");
})