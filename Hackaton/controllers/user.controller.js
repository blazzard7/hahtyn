import {User} from '../models/user.model.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get user profile
export const getProfile = async (req, res) => {
    try {
        const user_id = req.user.userId; // Extract user ID from JWT

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove sensitive information from the response
        const { password, ...userData } = user.get({ plain: true }); // Exclude the password

        res.json(userData); // Send profile data (without password)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get a user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.user_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create User (Registration)
export const createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, patronymic, surname, status, login, password, email, phone, group_id } = req.body;

    try {
        const newUser = await User.create({
            name,
            patronymic,
            surname,
            status,
            login,
            password,
            email,
            phone,
            group_id
        });

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error(error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Login already exists' });
        }
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

// Update a user
export const updateUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { user_id } = req.params;
    const { name, patronymic, surname, status, login, password, email, phone, group_id } = req.body;

    try {
        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let hashedPassword = user.password;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
        }

        await user.update({
            name,
            patronymic,
            surname,
            status,
            login,
            password: hashedPassword,
            email,
            phone,
            group_id
        });

        res.json({ message: 'User updated successfully', user: user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const { user_id } = req.params;

    try {
        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();
        res.status(204).send();

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};