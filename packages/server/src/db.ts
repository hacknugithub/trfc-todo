import { PrismaClient } from '@prisma/client';

// Definición del tipo global para evitar conflictos en HMR (Hot Module Reload)
const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  // En Prisma 6 estándar, NO pasamos 'adapter'.
  // El motor nativo lee directamente process.env.DATABASE_URL
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Opcional: export default prisma; 
// (Es mejor mantener solo la exportación nombrada 'prisma' para consistencia)