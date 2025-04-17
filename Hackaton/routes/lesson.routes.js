import express from 'express';
import { getAllLessons, getLessonById, createLesson, updateLesson, deleteLesson } from '../controllers/lesson.controller.js';
import { body } from 'express-validator';
import authenticateToken from '../middleware/authMiddleware.js';
import authorizeRole from '../middleware/authorizeRole.js';

const router = express.Router();

router.get('/', getAllLessons);
router.get('/:lesson_id', getLessonById);

router.post('/',
    [
        body('discipline_id').isUUID().withMessage('Discipline ID is required'),
        body('lesson_time_slot_id').isUUID().withMessage('Lesson Time Slot ID is required'),
        body('teacher_id').isUUID().withMessage('Teacher ID is required'),
        body('group_id').isUUID().withMessage('Group ID is required'),
        body('classroom_id').isUUID().withMessage('Classroom ID is required')
    ],
    authenticateToken, authorizeRole(['technician', 'admin']), createLesson);

router.put('/:lesson_id', authenticateToken, authorizeRole(['technician', 'admin']), updateLesson);
router.delete('/:lesson_id', authenticateToken, authorizeRole(['technician', 'admin']), deleteLesson);

export default router;