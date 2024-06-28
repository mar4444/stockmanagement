import { Request, Response } from 'express';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import User from '../models/Users';
import dotenv from 'dotenv';
import { signupSchema } from '../validations/validationSchemas';
import { loginSchemas } from '../validations/loginSchema';

dotenv.config();

const generateToken = (user: any) => {
    return jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_SECRET!, {
        expiresIn: '1h',
    });
};

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        // Validate the request body using Joi
        const { error } = signupSchema.validate(req.body);
        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }

        const { username, password, email } = req.body;
        const user = await User.create({ username, password, email });
        res.send(user);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        // Validate the request body using Joi
        const { error } = loginSchemas.validate(req.body);
        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }

        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user) {
            res.status(401).json({ error: 'Invalid username or password' });
            return;
        }

        const isValid = await user.validPassword(password);
        if (!isValid) {
            res.status(401).json({ error: 'Invalid username or password' });
            return;
        }
        const token = generateToken(user);
        res.status(200).json({ message: 'Logged in', token });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
