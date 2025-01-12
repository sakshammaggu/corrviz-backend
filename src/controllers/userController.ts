import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import User from '../models/User';
import { generateToken } from '../services/authService';
import { createUser } from '../services/userService';

export const signUpUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }
    const user = await createUser(email, password);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
};

export const loginUser = async (req:Request, res:Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); 
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
    });
    return;
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};