import User from './models/user.model';
import Classroom from './models/classroom.model';
import Lesson from './models/lesson.model';
import Discipline from './models/discipline.model';
import LessonTimeSlot from './models/lesson-time-slot.model';
import Group from './models/group.model';
import Schedule from './models/schedule.model';

// User - Group Association (1:M)
User.belongsTo(Group, { foreignKey: 'group_id', as: 'group' });
Group.hasMany(User, { foreignKey: 'group_id' });

// Lesson - Discipline Relationship
Lesson.belongsTo(Discipline, { foreignKey: 'discipline_id', as: 'discipline' });
Discipline.hasMany(Lesson, { foreignKey: 'discipline_id' });

// Lesson - TimeSlot Relationship
Lesson.belongsTo(LessonTimeSlot, { foreignKey: 'lesson_time_slot_id', as: 'timeSlot' });
LessonTimeSlot.hasMany(Lesson, { foreignKey: 'lesson_time_slot_id' });

// Lesson - Teacher (User) Relationship
Lesson.belongsToMany(User, {
    through: 'LessonTeachers', // Joining table
    foreignKey: 'lesson_id',
    otherKey: 'teacher_id',
    as: 'teachers'
});
User.belongsToMany(Lesson, {
    through: 'LessonTeachers',
    foreignKey: 'teacher_id',
    otherKey: 'lesson_id',
    as: 'lessons'
});

// Lesson - Group Relationship
Lesson.belongsTo(Group, { foreignKey: 'group_id', as: 'group' });
Group.hasMany(Lesson, { foreignKey: 'group_id' });

// Lesson - Classroom (Auditorium) Relationship
Lesson.belongsTo(Classroom, { foreignKey: 'classroom_id', as: 'classroom' });
Classroom.hasMany(Lesson, { foreignKey: 'classroom_id' });

// Schedule - Lesson Relationship (1:M) -  Schedule links to a Lesson
Schedule.belongsTo(Lesson, { foreignKey: 'lesson_id', as: 'lesson' });
Lesson.hasMany(Schedule, { foreignKey: 'lesson_id' });