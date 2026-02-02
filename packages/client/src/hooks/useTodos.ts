import useSWR from "swr";
import { api, fetcher } from "../lib/axios";

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export const useTodos = () => {
  const { data, error, isLoading, mutate } = useSWR<Todo[]>('/todos', fetcher);

  const createTodo = async (title: string, description?: string) => {
    const user = JSON.parse(localStorage.getItem('user') as string);
    const currentUserId = user.id || '';

    await api.post('/todos', { title, description, userId: currentUserId });
    mutate();
  };

  const updateTodo = async (id: string, data: Partial<Todo>) => {
    // optimistic update approach
    mutate(
      (currentTodo) => currentTodo?.map(todo => todo.id === id ? { ...todo, ...data } : todo) ?? [],
      false
    );

    await api.patch(`/todos/${id}`, data);
    mutate();
  }

  const deleteTodo = async (id: string) => {
    mutate((todos) => todos?.filter(todo => todo.id !== id) ?? [], false);
    await api.delete(`/todos/${id}`);
    mutate();
  }

  return { todos: data, isLoading, isError: error, createTodo, updateTodo, deleteTodo };
};