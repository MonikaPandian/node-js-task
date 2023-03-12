const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/mongoDB');

// config dot env file
dotenv.config();

//database call
connectDB();

//rest object
const app = express();

// middleware use to accept json data
app.use(express.json());

// middleware to enable cross origin resouce sharing
app.use(cors());

// user route
app.use("/api/users", userRoutes);

//port
const PORT = process.env.PORT || 8080;

//listen server
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
});