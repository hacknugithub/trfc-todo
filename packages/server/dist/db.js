"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
// Define the type so we prevent conflicts with HMR
const globalForPrisma = global;
exports.prisma = globalForPrisma.prisma ?? new client_1.PrismaClient({
    // Pisma 6 dont need to pass adapter for env var 
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});
if (process.env.NODE_ENV !== 'production')
    globalForPrisma.prisma = exports.prisma;
