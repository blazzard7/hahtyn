// controllers/auth.controller.js
import { User } from '../models/user.model.js'; // Import your User model
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/auth.js';

// Registration
export const register = async (req, res) => {
    try {
        const { name, patronymic, surname, status, login, password, email, phone, group } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ where: { login } });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this login already exists' });
        }

        // Create the user (password hashing is handled by the Sequelize hook)
        const newUser = await User.create({
            name,
            patronymic,
            surname,
            status,
            login,
            password,
            email,
            phone,
            group
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};

// Login
export const login = async (req, res) => {
    try {
        const { login, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ where: { login } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = generateToken(user); // Use your generateToken function

        // Send the token back to the user
        res.json({ token, user: { user_id: user.user_id, login: user.login, status: user.status, group: user.group } }); // Return user information for frontend

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};

export const logout = async (req, res) => {
    // Invalidate the token (for example, by storing it in a blacklist).
    // For simplicity, we'll just clear the client-side token.
    res.status(200).json({ message: 'Logout successful' });
};

// Forgot Password (Example)
export const forgotPassword = async (req, res) => {
    try {
        const { login } = req.body; // Using login instead of email, as per your model

        // Check if user exists
        const user = await User.findOne({ where: { login } });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Generate a reset token (you'll need a library for this)
        // Send an email with the reset token and a link to reset the password

        res.json({ message: 'Password reset email sent (implementation pending)' });
    } catch (error) {
        console.error('Error during forgot password:', error);
        res.status(500).json({ message: 'Forgot password failed', error: error.message });
    }
};