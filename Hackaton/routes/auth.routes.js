import express from 'express';
const router = express.Router();
import { register, login, logout, forgotPassword } from '../controllers/auth.controller.js';
import authenticateToken from '../middleware/authMiddleware.js';

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticateToken, logout);
router.post('/forgot-password', forgotPassword);

export default router;