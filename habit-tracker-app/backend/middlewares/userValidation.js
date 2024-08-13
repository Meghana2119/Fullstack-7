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
const loginCheck = (req,res,next)=>{
    const { name, password } = req.body;
  //conn.query("SELECT name,password FROM users ")
 
  conn.query("SELECT name, password FROM users WHERE name = ?", [name], async (err, result, fields) => {
        if (err) throw err;
        if (result.length === 0) /* change to thre equals to, to work properly*/{
          console.log(result.length)
         console.log(" User does not exist")
         res.sendStatus(404)
        } 
        else {
           const hashedPassword = result[0].password
           
           //get the hashedPassword from result forgot await here so got wrong output
           if (await bcrypt.compare(password, hashedPassword)) {
          console.log("---------> Login Successful")
          res.send(`${name} is logged in!`)
          } 
          else {
          console.log("---------> Password Incorrect")
          res.send("Password incorrect!")// to send proper response, on homepage
          } //end of bcrypt.compare()
        }
  })


}

export { registerValidation, validate,loginCheck }