import { Router } from 'express';
const router = Router();
import { registerValidation, validate } from '../middlewares/userValidation.js'
import { register } from '../controllers/authController.js'

// Registration route
router.post('/register', registerValidation, register);

export default router;
