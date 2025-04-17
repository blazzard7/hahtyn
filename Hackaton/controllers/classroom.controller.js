import {Classroom} from '../models/classroom.model.js';

export const getAllClassrooms = async (req, res) => {
    try {
        const classrooms = await Classroom.findAll();
        res.json(classrooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getClassroomById = async (req, res) => {
    try {
        const classroom = await Classroom.findByPk(req.params.classroom_id);
        if (!classroom) {
            return res.status(404).json({ message: 'Classroom not found' });
        }
        res.json(classroom);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const createClassroom = async (req, res) => {
    try {
        const newClassroom = await Classroom.create(req.body);
        res.status(201).json(newClassroom);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateClassroom = async (req, res) => {
    try {
        const [updated] = await Classroom.update(req.body, {
            where: { classroom_id: req.params.classroom_id }
        });
        if (updated) {
            const updatedClassroom = await Classroom.findByPk(req.params.classroom_id);
            return res.json({ message: 'Classroom updated successfully', classroom: updatedClassroom });
        }
        return res.status(404).json({ message: 'Classroom not found' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteClassroom = async (req, res) => {
    try {
        const deleted = await Classroom.destroy({
            where: { classroom_id: req.params.classroom_id }
        });
        if (deleted) {
            return res.status(204).send();
        }
        return res.status(404).json({ message: 'Classroom not found' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};