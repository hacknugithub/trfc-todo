import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import { app } from '../app';
import { prismaMock } from './helpers/db';

type TodoCreateInput = {
  id: string;
  title: string;
  description?: string;
  userId: string;
  completed?: boolean;
  createdAt?: String;
  updatedAt?: String;
  user: {
    name: string;
    email: string;
  };
};

describe('POST /api/todos', () => {
  it('should create a new TODO successfully', async () => {
    const newTodo = {
      title: 'Test Todo',
      description: 'Vitest test for creating todo',
      userId: '1',
    };

    prismaMock.todo.create.mockResolvedValue({
      id: '100',
      title: newTodo.title,
      description: newTodo.description,
      completed: false,
      userId: newTodo.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const response = await request(app)
      .post('/api/todos')
      .send(newTodo);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id', '100');
    expect(response.body.title).toBe(newTodo.title);

    expect(prismaMock.todo.create).toHaveBeenCalledWith({
      data: {
        title: newTodo.title,
        description: newTodo.description,
        userId: newTodo.userId,
      },
    });
  });

  it('Should fail when title is not given', async () => {
    const invalidTodo = {
      description: 'No title provided',
    };

    const response = await request(app)
      .post('/api/todos')
      .send(invalidTodo);

    expect(response.status).toBe(400); // Zod validation
    expect(prismaMock.todo.create).not.toHaveBeenCalled();
  });
});

describe('GET /api/todos', () => {
  it('should return a list of todos', async () => {
    const mockCreateRecords = { count: 2 }

    const todos: TodoCreateInput[] = [
      {
        id: '1',
        title: 'Todo 1',
        description: 'Description 1',
        completed: false,
        userId: '1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        user: {
          name: 'User',
          email: 'test@example.org',
        },
      },
      {
        id: '2',
        title: 'Todo 2',
        description: 'Description 2',
        completed: true,
        userId: '1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        user: {
          name: 'User',
          email: 'test@example.org',
        },
      },
    ];
    prismaMock.todo.createMany.mockResolvedValue(mockCreateRecords);
    prismaMock.todo.findMany.mockResolvedValue(todos as any);

    const response = await request(app).get('/api/todos');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(todos);
    expect(prismaMock.todo.findMany).toHaveBeenCalled();
  });
});