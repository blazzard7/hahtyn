// src/routes/group.routes.js

import express from 'express';
import { getAllGroups, getGroupById, createGroup, updateGroup, deleteGroup } from '../controllers/group.controller.js';
import authenticateToken from '../middleware/authMiddleware.js';
import authorizeRole from '../middleware/authorizeRole.js';
import { body } from 'express-validator';

const router = express.Router();

// Admin access: Manage groups
router.get('/', authenticateToken, authorizeRole(['admin']), getAllGroups);
router.get('/:group_id', authenticateToken, authorizeRole(['admin']), getGroupById);
router.post('/',
    [
        body('name').notEmpty().withMessage('Name is required')
    ],
    authenticateToken, authorizeRole(['admin']), createGroup);
router.put('/:group_id',
    [
        body('name').notEmpty().withMessage('Name is required')
    ],
    authenticateToken, authorizeRole(['admin']), updateGroup);
router.delete('/:group_id', authenticateToken, authorizeRole(['admin']), deleteGroup);

export default router;