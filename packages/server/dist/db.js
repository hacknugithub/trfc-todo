"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_js_1 = require("./generated/client.js");
const globalForPrisma = global;
exports.prisma = globalForPrisma.prisma ?? new client_js_1.PrismaClient({
    accelerateUrl: process.env.PRISMA_ACCELERATE_URL ?? '',
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});
if (process.env.NODE_ENV !== 'production')
    globalForPrisma.prisma = exports.prisma;
exports.default = exports.prisma;
