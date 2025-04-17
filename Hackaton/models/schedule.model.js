// schedule.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Импортируем модели, чтобы задать связи
import { LessonTimeSlot } from './lesson-time-slot.model.js';
import { Discipline } from './discipline.model.js';
import { Lesson } from './lesson.model.js';
import { Group } from './group.model.js';
import { User } from './user.model.js';  // Импортируем User

const Schedule = sequelize.define('Schedule', {
  schedule_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  lesson_id: { // Ссылка на урок
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Lessons',
      key: 'lesson_id'
    }
  },
  group_id: { // Ссылка на группу
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Groups',
      key: 'group_id'
    }
  },
  classroom_id: { // Ссылка на кабинет
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Classrooms',
      key: 'classroom_id'
    }
  },
  discipline_id: { // Ссылка на дисциплину
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Disciplines',
      key: 'discipline_id'
    }
  },
  lesson_time_slot_id: { // Ссылка на таймслот
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'LessonTimeSlots',
      key: 'lesson_time_slot_id'
    }
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'schedules',
  timestamps: false
});

// Определяем связи (Associations)
Schedule.belongsTo(LessonTimeSlot, {
  foreignKey: 'lesson_time_slot_id',
  as: 'timeSlot' // Псевдоним для связи
});

Schedule.belongsTo(Discipline, {
  foreignKey: 'discipline_id',
  as: 'discipline' // Псевдоним для связи
});

Schedule.belongsTo(Lesson, {
  foreignKey: 'lesson_id',
  as: 'lesson' // Псевдоним для связи
});

Schedule.belongsTo(Group, {
  foreignKey: 'group_id',
  as: 'group' // Псевдоним для связи
});

// Непосредственная связь с User не нужна, связь идет через Lesson

export { Schedule };