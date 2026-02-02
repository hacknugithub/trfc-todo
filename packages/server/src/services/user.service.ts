import { prisma } from '../db';
import bcrypt from 'bcryptjs';

export const getUsers = async () => {
  return prisma.user.findMany({
    include: { todos: { select: { title: true, description: true, completed: true} } },
    omit: { password: true }
  });
};

export const getUser = async (id: string, email?: string) => {
  let user =  prisma.user.findUnique({
    where: { id }
  })

  user = email ? prisma.user.findUnique({
    where: { email }
  }) : user;

  return user;
}

export const createUser = async (data: { name: string; email: string; password: string }) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword
    }
  });
};

export const updateUser = async (id: string, data: any) => {
  return await prisma.user.update({
    where: { id },
    data
  });
};

export const deleteUser = async (id: string) => {
  return await prisma.user.delete({
    where: { id }
  });
};