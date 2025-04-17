import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const LessonTimeSlot = sequelize.define('LessonTimeSlot', {
    lesson_time_slot_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    day: {
        type: DataTypes.ENUM('Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'),
        allowNull: false 
    },
    start: {
        type: DataTypes.TIME,
        allowNull: false
    },
    end: {
        type: DataTypes.TIME,
        allowNull: false
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'lesson_time_slots',
    timestamps: false
});

export {LessonTimeSlot};