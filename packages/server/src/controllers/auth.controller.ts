import { Request, Response } from 'express';
import * as userService from '../services/user.service';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  const user = await userService.getUser('', email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || 'supersecret', { expiresIn: '1h' });

  const {password: _, ...userWithoutPassword} = user;
  res.json({ token, user: userWithoutPassword });
}