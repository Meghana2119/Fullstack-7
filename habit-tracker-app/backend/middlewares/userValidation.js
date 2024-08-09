import { body, validationResult } from 'express-validator'

//Validation process using express-validator

const registerValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 12 }).withMessage('Password must be at least 12 characters long')
]

// Middleware to handle validation results
const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}

export { registerValidation, validate }