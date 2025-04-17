import express from 'express';
import { getAllClassrooms, getClassroomById, createClassroom, updateClassroom, deleteClassroom } from '../controllers/classroom.controller.js';
import authenticateToken from '../middleware/authMiddleware.js';
import authorizeRole from '../middleware/authorizeRole.js';

const router = express.Router();

// Admin access: Manage groups
router.get('/', authenticateToken, authorizeRole(['admin', 'technician']), getAllClassrooms);
router.get('/:classroom_id', authenticateToken, authorizeRole(['admin', 'technician']), getClassroomById);
router.post('/', authenticateToken, authorizeRole(['admin', 'technician']), createClassroom);
router.put('/:classroom_id', authenticateToken, authorizeRole(['admin', 'technician']), updateClassroom);
router.delete('/:classroom_id', authenticateToken, authorizeRole(['admin', 'technician']), deleteClassroom);

export default router;