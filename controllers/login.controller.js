import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config/env.js';
import jwt from 'jsonwebtoken';

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            const error = new Error('Please provide required credentials');
            error.status = 400;
            throw error;
        }

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            const error = new Error('Invalid credentials!');
            error.status = 401;
            throw error;
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            const error = new Error('Invalid credentials!');
            error.status = 401;
            throw error;
        }

        const accessToken = jwt.sign(
            { id: user._id },
            ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
            { id: user._id },
            REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({
            success: true,
            message: 'User logged in successfully.',
            accessToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        if (!err.status) {
            err.status = 500;
        }
        next(err);
    }
};

export default loginUser;