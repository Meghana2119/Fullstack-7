import { body, validationResult } from 'express-validator'
import conn from '../config/db.js'
import bcrypt from 'bcryptjs'

//Validation process using express-validator

const registerValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address').normalizeEmail(),
    body('password').isLength({ min: 12 }).withMessage('Password must be at least 12 characters long')
]

// Middleware to handle validation results
const validate = (req, res, next) => {
    console.log('Running validation middleware'); // Debug log
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}

const loginCheck = async (req, res, next) => {
  const { name, password } = req.body;

  try {
      conn.query("SELECT name, password FROM users WHERE name = ?", [name], async (err, result, fields) => {
          if (err) throw err;

          if (result.length === 0) {
              console.log("User does not exist");
              return res.status(404).json({ message: "User does not exist" });
          } else {
              const hashedPassword = result[0].password;

              if (await bcrypt.compare(password, hashedPassword)) {
                  console.log("Login Successful");
                  return res.status(200).json({ message: "Login successful", token: "your-jwt-token-here" });
              } else {
                  console.log("Password Incorrect");
                  return res.status(401).json({ message: "Password incorrect" });
              }
          }
      });
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
  }
};

export { registerValidation, validate,loginCheck }