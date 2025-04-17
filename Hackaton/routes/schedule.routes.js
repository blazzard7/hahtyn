// src/routes/schedule.routes.js

import express from 'express';
import {
    getAllSchedules,
    getScheduleById,
    createSchedule,
    updateSchedule,
    deleteSchedule,
    getPersonalSchedule,
    getGroupSchedule
} from '../controllers/schedule.controller.js';
import authenticateToken from '../middleware/authMiddleware.js';
import authorizeRole from '../middleware/authorizeRole.js';

const router = express.Router();

// Guest access: View all schedules (no authentication required)
router.get('/', getAllSchedules);
router.get('/:schedule_id', getScheduleById);

// Student/Teacher access: Personal schedule, group schedule
router.get('/personal', authenticateToken, authorizeRole(['student', 'teacher']), getPersonalSchedule);
router.get('/group/:group_id', authenticateToken, authorizeRole(['student', 'teacher']), getGroupSchedule);

// Technician access: Create, Update, Delete Schedules
router.post('/', authenticateToken, authorizeRole(['technician']), createSchedule);
router.put('/:schedule_id', authenticateToken, authorizeRole(['technician']), updateSchedule);
router.delete('/:schedule_id', authenticateToken, authorizeRole(['technician']), deleteSchedule);

export default router;