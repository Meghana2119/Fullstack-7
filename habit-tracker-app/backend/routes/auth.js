import { Router } from 'express'
import { registerValidation, validate } from '../middlewares/userValidation.js'
import { register } from '../controllers/authController.js'


const router = Router()
// Registration route
router.post('/register', registerValidation, register)

export default router
