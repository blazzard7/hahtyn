import {Group} from '../models/group.model.js';
import { validationResult } from 'express-validator';

export const getAllGroups = async (req, res) => {
    try {
        const groups = await Group.findAll();
        res.json(groups);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getGroupById = async (req, res) => {
    try {
        const group = await Group.findByPk(req.params.group_id);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        res.json(group);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const createGroup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const newGroup = await Group.create(req.body);
        res.status(201).json(newGroup);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const updateGroup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const [updated] = await Group.update(req.body, {
            where: { group_id: req.params.group_id }
        });
        if (updated) {
            const updatedGroup = await Group.findByPk(req.params.group_id);
            return res.json({ message: 'Group updated successfully', group: updatedGroup });
        }
        return res.status(404).json({ message: 'Group not found' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const deleteGroup = async (req, res) => {
    try {
        const deleted = await Group.destroy({
            where: { group_id: req.params.group_id }
        });
        if (deleted) {
            return res.status(204).send();
        }
        return res.status(404).json({ message: 'Group not found' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};