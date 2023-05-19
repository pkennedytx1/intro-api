const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const auth = require("./middleware/auth");
// Configure .env
require("dotenv").config();
// Connect to mongo db
require("./config/database").connect();
// User Model
const User = require("./model/user");

app.use(bodyParser.json())
app.use('/patrick', express.static('public/pat.html'))
app.use('/home', express.static('public/index.html'))

app.get("/", auth, (req, res, next) => {
    res.json("Howdy hey from out API!🤠")
})

// Sign Up
app.post("/register", async (req, res) => {
    try {
        // Get user input
        const { first_name, last_name, email, password } = req.body;

        // Validate user input
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        return res.status(201).json("User Created! 🔥");
    } catch (err) {
        console.log(err);
    }
});
    
// Login
app.post("/login", async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create JWT token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                { expiresIn: "2h"}
            );

            // Return token to client
            return res.status(200).json(token);
        }
        // Return error when invalid
        return res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
});

app.post("/", (req, res, next) => {
    const data = req.body;
    data.progress = "In Progress";
    res.json(data)
})

app.listen(PORT, () => {
    console.log(`🔥🔥🔥 Server running on port ${PORT} 🔥🔥🔥`);
})