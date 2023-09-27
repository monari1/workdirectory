const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const mysql2 = require('mysql2');
const port = 8080;
const app = express();

app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "monarI10$",
    database: "register"
});

con.connect((err) => {
    if (err) {
        console.error("Error connecting to the database: " + err.message);
    } else {
        console.log("Connected to the database");
    }
});

app.post('/register', (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const sql = "INSERT INTO users (email, username, password) VALUES (?, ?, ?)";
    const values = [email, username, password];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error registering user: " + err.message);
            res.status(500).json({ message: "Error while registering user" });
        } else {
            res.json({ message: "User registered successfully" });
        }
    });
});


app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    const values = [username, password];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error logging in: " + err.message);
            res.status(500).json({ message: "Error while logging in" });
        } else {
            if (result.length > 0) {
                res.json(result);
            } else {
                res.status(401).json({ message: "Wrong username or password" });
            }
        }
    });
});

app.listen(3001, () => {
    console.log("Running backend server on port 3001");
});

const app2 = express();

app2.use(cors());
app2.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'monarI10$',
    database: 'register',
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to the database');
});

// Your routes for handling image uploads and other operations
// ...

app2.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


app2.post('/upload', (req, res) => {
    const { imageData } = req.body; // imageData can be base64 or binary data

    // Insert the imageData into your MySQL database
    const insertQuery = 'INSERT INTO images (data) VALUES (?)';

    db.query(insertQuery, [imageData], (err, results) => {
        if (err) {
            console.error('Error inserting image into the database: ' + err.message);
            res.status(500).json({ error: 'Failed to upload image' });
        } else {
            res.status(200).json({ message: 'Image uploaded successfully' });
        }
    });
});