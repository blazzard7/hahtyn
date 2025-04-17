import express from 'express';
import userRoutes from './routes/user.routes.js';
import classroomRoutes from './routes/classroom.routes.js';
import scheduleRoutes from './routes/schedule.routes.js';
import lessonRoutes from './routes/lesson.routes.js';
import groupRoutes from './routes/group.routes.js'
import cors from 'cors';

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all origins

// Or, configure CORS for specific origins:
app.use(cors({
  origin: 'http://localhost:3001' // Replace with your frontend's URL
}));

// Routes
app.use('/users', userRoutes);
app.use('/classrooms', classroomRoutes);
app.use('/lesson', lessonRoutes);
app.use('/schedules', scheduleRoutes);
app.use('/groups', groupRoutes);

export default app;