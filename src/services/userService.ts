import bcrypt from 'bcryptjs';
import User from '../models/User';

export const createUser = async (email: string, password: string) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) { throw new Error('User already exists'); }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });
  return newUser.save();
};