import { prisma } from '../db';

export const getTodos = async () => {
  return prisma.todo.findMany({
    include: { user: { select: { name: true, email: true } } }
  });
};

export const createTodo = async (data: { title: string; description?: string; userId: string }) => {
  return await prisma.todo.create({
    data: {
      title: data.title,
      description: data.description,
      userId: data.userId
    }
  });
};

export const updateTodo = async (id: string, data: any) => {
  return await prisma.todo.update({
    where: { id },
    data
  });
};

export const deleteTodo = async (id: string) => {
  return await prisma.todo.delete({
    where: { id }
  });
};