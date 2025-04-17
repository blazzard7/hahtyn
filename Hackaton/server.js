import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js'; // Import Sequelize instance
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({origin: 'http://localhost:3001'}));
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Test the database connection and sync models
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Sync the model with the database (creates the table if it doesn't exist)
    await sequelize.sync({ alter: true });  
    console.log('Database synced.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});