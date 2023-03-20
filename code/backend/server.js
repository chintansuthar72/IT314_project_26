const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Log requests to the console
app.use(morgan("dev"));

app.get("/api", (req, res) => {
        res.send("Hello! The API is at http://localhost:" + PORT + "/api");
    }
);

app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT);
    // connect to mongodb
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.log("Error connecting to MongoDB", err);
    });
}
);
