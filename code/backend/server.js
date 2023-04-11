const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const dotenv = require("dotenv");
const { userRoute } = require("./routes/index.route");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin : "http://localhost:3000",
    // origin : '*'
}

// Log requests to the console
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("./public"));

app.get("/api", (req, res) => {
        res.send("Hello! The API is at http://localhost:" + PORT + "/api");
    }
);

app.use('/user',userRoute);

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
