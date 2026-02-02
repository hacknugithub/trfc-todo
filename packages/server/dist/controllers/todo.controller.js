"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getAll = void 0;
const todoService = __importStar(require("../services/todo.service"));
const todo_schema_1 = require("../schemas/todo.schema");
const getAll = async (req, res) => {
    try {
        const todos = await todoService.getTodos();
        res.json(todos);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getAll = getAll;
const create = async (req, res) => {
    try {
        const validatedData = todo_schema_1.createTodoSchema.parse(req.body);
        const newTodo = await todoService.createTodo(validatedData);
        res.status(201).json(newTodo);
    }
    catch (error) {
        if (error.name === 'ZodError') {
            return res.status(400).json({ message: 'Validation error.', errors: error.errors });
        }
        res.status(500).json({ error: 'Could not create the todo.' });
    }
};
exports.create = create;
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const validatedData = todo_schema_1.updateTodoSchema.parse(req.body);
        const updatedTodo = await todoService.updateTodo(id, validatedData);
        res.json(updatedTodo);
    }
    catch (error) {
        res.status(400).json({ message: 'Could not update the todo. Check ID or data is incorrect' });
    }
};
exports.update = update;
const remove = async (req, res) => {
    try {
        const { id } = req.params;
        await todoService.deleteTodo(id);
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ message: 'Could not delete the todo. Check ID is incorrect' });
    }
};
exports.remove = remove;
