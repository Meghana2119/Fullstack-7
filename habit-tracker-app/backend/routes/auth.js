const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const conn = require('../config/db');

router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);

    try {
        // Check if the user already exists
        const result = conn.execute("SELECT * FROM Users WHERE email = ?", [email])


        if (result.length > 0) {
            return res.status(400).json({ message: 'User already exists' })
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Insert the new user into the database
        const row = await conn.execute(
            'INSERT INTO Users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        )
        console.log(result)
        //Optionally, generate a JWT token
        //const token = jwt.sign({ userId: row.insertId }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
