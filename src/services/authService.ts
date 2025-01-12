import jwt, { JwtPayload } from 'jsonwebtoken';
import { Document } from 'mongoose';
import User from '../models/User';

interface User extends Document {
  email: string;
  password: string;
}

export const generateToken = (user: User): string => {
  const payload = { email: user.email, };
  const jwtSecret = process.env.JWT_SECRET_KEY as string;
  return jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
};

export const verifyToken = (token: string): JwtPayload | string => {
  try {
    const jwtSecret = process.env.JWT_SECRET_KEY as string;
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};