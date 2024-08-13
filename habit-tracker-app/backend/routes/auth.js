import { Router } from 'express'
import { registerValidation, validate,loginCheck } from '../middlewares/userValidation.js'
import { register } from '../controllers/authController.js'


const router = Router()
// Registration route
router.post('/register', registerValidation, validate, register)
//Login route
router.post('/login',loginCheck)

export default router
