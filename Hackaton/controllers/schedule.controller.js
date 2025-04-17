// Например, schedule.controller.js
import { Schedule } from '../models/schedule.model.js';
import { Lesson } from '../models/lesson.model.js';
import { Discipline } from '../models/discipline.model.js';
import { LessonTimeSlot } from '../models/lesson-time-slot.model.js';
import { User } from '../models/user.model.js';  // Импортируем User
import { Classroom } from '../models/classroom.model.js';
import { Group } from '../models/group.model.js';


export const getPersonalSchedule = async (req, res) => {
  try {
    const userId = req.user.userId; // User ID from the JWT
    const schedules = await Schedule.findAll({
      include: [
        {
          model: LessonTimeSlot, // Непосредственно включаем timeSlot
          as: 'timeSlot'
        },
        {
          model: Discipline, // Непосредственно включаем discipline
          as: 'discipline'
        },
        {
          model: Lesson, // Включаем Lesson, чтобы получить teacher
          as: 'lesson',
          include: [
            {
              model: User, // Включаем User (учителя) через Lesson
              as: 'teacher'
            }
          ]
        },
        {
          model: Classroom, // Непосредственно включаем classroom
          as: 'classroom'
        },
        {
          model: Group, // Непосредственно включаем group
          as: 'group'
        }
      ],
      where: { '$lesson.teacher_id$': userId } // Find schedules based on teacher role assigned to the user
    });
    res.json(schedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getGroupSchedule = async (req, res) => {
    try {
        const groupId = req.params.group_id;

        const schedules = await Schedule.findAll({
            include: [
                {
                    model: LessonTimeSlot,
                    as: 'timeSlot'
                },
                {
                    model: Discipline,
                    as: 'discipline'
                },
                {
                    model: Lesson,
                    as: 'lesson',
                    include: [
                        {
                            model: User,
                            as: 'teacher'
                        }
                    ]
                },
                {
                    model: Classroom,
                    as: 'classroom'
                },
                {
                    model: Group,
                    as: 'group'
                }
            ],
            where: { '$group.group_id$': groupId } // find all schedules with the same group id as the requested
        });
        res.json(schedules);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
export const getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.findAll();
        res.json(schedules);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getScheduleById = async (req, res) => {
    try {
        const schedule = await Schedule.findByPk(req.params.schedule_id);
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }
        res.json(schedule);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const createSchedule = async (req, res) => {
    try {
        const newSchedule = await Schedule.create(req.body);
        res.status(201).json(newSchedule);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateSchedule = async (req, res) => {
    try {
        const [updated] = await Schedule.update(req.body, {
            where: { schedule_id: req.params.schedule_id }
        });
        if (updated) {
            const updatedSchedule = await Schedule.findByPk(req.params.schedule_id);
            return res.json({ message: 'Schedule updated successfully', schedule: updatedSchedule });
        }
        return res.status(404).json({ message: 'Schedule not found' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteSchedule = async (req, res) => {
    try {
        const deleted = await Schedule.destroy({
            where: { schedule_id: req.params.schedule_id }
        });
        if (deleted) {
            return res.status(204).send();
        }
        return res.status(404).json({ message: 'Schedule not found' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};