import { PrismaClient } from '@prisma/client';

// Define the type so we prevent conflicts with HMR
const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  // Pisma 6 dont need to pass adapter for env var 
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;