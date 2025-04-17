import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Lesson = sequelize.define('Lesson', {
    lesson_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING, // Added a name field
        allowNull: false // Set appropriate
    },
    type: {
        type: DataTypes.ENUM('Lecture', 'Practice', 'Seminar', 'Distance'),
        allowNull: false
    }
}, {
    tableName: 'lessons',
    timestamps: false
});

export {Lesson};