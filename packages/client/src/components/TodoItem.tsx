import { useEffect, useRef, useState } from "react";
import type { Todo } from "../hooks/useTodos";
import { cn } from "../lib/utils";

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, data: Partial<Todo>) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = ({ todo, onUpdate, onDelete }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  // const [description, setDescription] = useState(todo.description || '');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if(title.trim() && title !== todo.title) {
      onUpdate(todo.id, { title });
    } else {
      setTitle(todo.title);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setTitle(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <li className="group flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:shadow-sm transition-all duration-200 mb-3">
      <div className="flex items-center gap-4 flex-1">
        {/* Checkbox */}
        <button
          onClick={() => onUpdate(todo.id, { completed: !todo.completed })}
          className={cn(
            "flex-shrink-0 h-6 w-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center",
            todo.completed 
              ? "bg-green-500 border-green-500" 
              : "border-gray-300 hover:border-blue-500"
          )}
        >
          {todo.completed && <span className="text-white text-xs font-bold">✓</span>}
        </button>
        
        {/* Input */}
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="flex-1 p-1 -ml-1 text-lg border-b-2 border-blue-500 outline-none bg-transparent"
          />
        ) : (
          <span 
            onDoubleClick={() => !todo.completed && setIsEditing(true)}
            className={cn(
              "text-lg transition-all duration-200 select-none flex-1 cursor-text",
              todo.completed ? "text-gray-400 line-through" : "text-gray-700"
            )}
            title="Doble click para editar"
          >
            {todo.title}
          </span>
        )}
      </div>

      {/* Botones de Acción */}
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {!isEditing && !todo.completed && (
          <button 
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
          >
          ✏️
          </button>
        )}
        <button 
          onClick={() => onDelete(todo.id)}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
        >
          🗑️
        </button>
      </div>
    </li>
  );
} 