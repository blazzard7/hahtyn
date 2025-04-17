import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, getProfile } from '../controllers/user.controller.js';
import { body } from 'express-validator';
import authenticateToken from '../middleware/authMiddleware.js';
import authorizeRole from '../middleware/authorizeRole.js';

const router = express.Router();

// Admin access: Manage users (get all, get by ID, create, update, delete)
router.get('/', authenticateToken, authorizeRole(['admin']), getAllUsers);
router.get('/:user_id', authenticateToken, authorizeRole(['admin']), getUserById);
router.post(
    '/register',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('surname').notEmpty().withMessage('Surname is required'),
        body('login').notEmpty().withMessage('Login is required').isAlphanumeric().withMessage('Login must be alphanumeric'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('email').optional().isEmail().withMessage('Invalid email format'),
        body('status').isIn(['admin', 'student', 'teacher', 'technician']).withMessage('Invalid status'),
        body('group_id').optional().isUUID().withMessage('Invalid Group ID')
    ],
    authenticateToken, authorizeRole(['admin']), createUser
);
router.put(
    '/:user_id',
    [
        body('name').optional().notEmpty().withMessage('Name is required'),
        body('surname').optional().notEmpty().withMessage('Surname is required'),
        body('login').optional().notEmpty().withMessage('Login is required').isAlphanumeric().withMessage('Login must be alphanumeric'),
        body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('email').optional().isEmail().withMessage('Invalid email format'),
        body('status').optional().isIn(['admin', 'student', 'teacher', 'technician']).withMessage('Invalid status'),
        body('group_id').optional().isUUID().withMessage('Invalid Group ID')
    ],
    authenticateToken, authorizeRole(['admin']), updateUser
);
router.delete('/:user_id', authenticateToken, authorizeRole(['admin']), deleteUser);

// Access to personal profile - for each user

router.get('/profile', authenticateToken, getProfile); // To get user's profile
router.put('/profile', authenticateToken, updateUser); // To allow each user to change his profile

export default router;