// src/utils/auth.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();  // Load environment variables from .env

// Generate a JWT token
export const generateToken = (user) => {
    const payload = {
        userId: user.user_id,
        role: user.status
    };
    const options = {
        expiresIn: '1h' // Token expires in 1 hour
    };

    return jwt.sign(payload, process.env.JWT_SECRET, options);  // Use environment variable
};

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from header

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }

        req.user = decoded; // Attach user information to the request
        next();
    });
};