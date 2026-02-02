"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodos = void 0;
const db_1 = __importDefault(require("../db"));
const getTodos = async () => {
    return db_1.default.todo.findMany({
        include: { user: { select: { name: true, email: true } } }
    });
};
exports.getTodos = getTodos;
const createTodo = async (data) => {
    return await db_1.default.todo.create({
        data: {
            title: data.title,
            description: data.description,
            userId: data.userId
        }
    });
};
exports.createTodo = createTodo;
const updateTodo = async (id, data) => {
    return await db_1.default.todo.update({
        where: { id },
        data
    });
};
exports.updateTodo = updateTodo;
const deleteTodo = async (id) => {
    return await db_1.default.todo.delete({
        where: { id }
    });
};
exports.deleteTodo = deleteTodo;
