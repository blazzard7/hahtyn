import {Lesson} from '../models/lesson.model.js';
import {Discipline} from '../models/discipline.model.js';
import {LessonTimeSlot} from '../models/lesson-time-slot.model.js';
import {User} from '../models/user.model.js';
import {Classroom} from '../models/classroom.model.js';
import {Group} from '../models/group.model.js';
import { validationResult } from 'express-validator';

export const getAllLessons = async (req, res) => {
    try {
        const lessons = await Lesson.findAll();
        res.json(lessons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getLessonById = async (req, res) => {
    try {
        const lesson = await Lesson.findByPk(req.params.lesson_id, {
            include: [
                { model: Discipline, as: 'discipline' },
                { model: LessonTimeSlot, as: 'timeSlot' },
                {
                    model: User,
                    as: 'teachers',
                    where: { status: 'teacher' } // Only include teachers
                },
                { model: Classroom, as: 'classroom' },
                { model: Group, as: 'group' }
            ]
        });
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }
        res.json(lesson);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const createLesson = async (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newLesson = await Lesson.create(req.body)
      res.json(newLesson)
    } catch(error) {
      console.error(error);
      res.status(500).json({message: "couldnt create"});
    }
}

export const updateLesson = async (req, res) => {
    try {
        const [updated] = await Lesson.update(req.body, {
            where: { lesson_id: req.params.lesson_id }
        });
        if (updated) {
            const updatedLesson = await Lesson.findByPk(req.params.lesson_id);
            return res.json({ message: 'Lesson updated successfully', lesson: updatedLesson });
        }
        return res.status(404).json({ message: 'Lesson not found' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteLesson = async (req, res) => {
    try {
        const deleted = await Lesson.destroy({
            where: { lesson_id: req.params.lesson_id }
        });
        if (deleted) {
            return res.status(204).send();
        }
        return res.status(404).json({ message: 'Lesson not found' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};