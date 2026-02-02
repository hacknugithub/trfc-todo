import { useTodos } from '../hooks/useTodos';
import { CreateTodoForm } from './CreateTodoForm';
import { TodoHeader } from './TodoHeader';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const { todos, isLoading, isError, createTodo, updateTodo, deleteTodo } = useTodos();

  if(isLoading) return <div className='p-4'>Loading...</div>;
  if(isError) return <div className='p-4 text-red-500'>Something went wrong...</div>;

 return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 via-green-500 to-yellow-500 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 pb-6">
        
        <TodoHeader /> 
        <div className="px-6">
          <CreateTodoForm onCreate={createTodo} />
          <ul className="space-y-1">
            {todos?.length === 0 && (
              <li className="py-12 text-center flex flex-col items-center text-gray-400">
                <span className="text-4xl mb-4">✨</span>
                <p>All done. Enjoy!!</p>
              </li>
            )}
            {todos?.map((todo) => (
              <TodoItem 
                key={todo.id} 
                todo={todo}
                onUpdate={updateTodo}
                onDelete={deleteTodo}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}