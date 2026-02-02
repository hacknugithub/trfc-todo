import { Request, Response } from 'express';
import * as todoService from '../services/todo.service';
import { createTodoSchema, updateTodoSchema } from '../schemas/todo.schema';

export const getAll = async (req: Request, res: Response) => {
  try {
    const todos = await todoService.getTodos();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const validatedData = createTodoSchema.parse(req.body);
    console.log(validatedData);
    const newTodo = await todoService.createTodo(validatedData);
    res.status(201).json(newTodo);
  } catch (error: any) {
    if(error.name === 'ZodError') {
      return res.status(400).json({ message: 'Validation error.', errors: error.errors });
    }
    res.status(500).json({ error: 'Could not create the todo.' });
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    const validatedData = updateTodoSchema.parse(req.body);
    console.log(validatedData);
    const updatedTodo = await todoService.updateTodo(id as string, validatedData);
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: 'Could not update the todo. Check ID or data is incorrect' });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await todoService.deleteTodo(id as string);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Could not delete the todo. Check ID is incorrect' });
  }
};