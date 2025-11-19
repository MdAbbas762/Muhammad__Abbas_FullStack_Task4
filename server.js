const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));

async function connection() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/users_data");
        console.log("Database connected successfully!");
    } catch (error) {
        console.log(`Connection error\n${error.message}`);
    }
}

connection();

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        trim: true
    },

    email: {
        required: true,
        type: String,
        trim: true,
        unique: true
    },

    message: {
        required: true,
        type: String,
        trim: true,
        minlength: 10,
        maxlength: 50
    }
});

const userModel = mongoose.model("user", userSchema);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/HTML/index.html"));
})

app.post("/submit", async (req, res) => {
    try {
        const insertedUser = await userModel.create({
            name: req.body.username,
            email: req.body.email,
            message: req.body.message
        });

        res.sendFile(path.join(__dirname, "/public/HTML/success.html"));
    } catch (error) {
        console.log(`Something went wrong\nError: ${error.message}`);
        res.sendFile(path.join(__dirname, "/public/HTML/fail.html"));
    }
})

app.listen(3000, () => {
    console.log("Server is running at PORT: 3000");
})