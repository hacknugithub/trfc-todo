import { Request, Response } from 'express';
import * as userService from '../services/user.service';
import { createUserSchema, updateUserSchema } from '../schemas/user.schema';

export const getAll = async (_req: Request, res: Response) => {
  try {
    const todos = await userService.getUsers();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.getUser(id as string);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Could not get the user. Check the ID provided' });
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const validatedData = createUserSchema.parse(req.body);
    const newUser = await userService.createUser(validatedData);
    res.status(201).json(newUser);
  } catch (error: any) {
    if(error.name === 'ZodError') {
      return res.status(400).json({ message: 'Validation error.', errors: error.errors });
    }
    res.status(500).json({ error: 'Could not create the user.' });
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = updateUserSchema.parse(req.body);
    const updatedUser = await userService.updateUser(id as string, validatedData);
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Could not update the user. Check ID or data is incorrect' });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id as string);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Could not delete the user. Check ID is incorrect' });
  }
};