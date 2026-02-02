import { useState } from 'react';
import { cn } from '../lib/utils';

interface CreateTodoFormProps {
  onCreate: (title: string) => Promise<void>;
  isSubmitting?: boolean;
}

export const CreateTodoForm = ({ onCreate }: CreateTodoFormProps) => {
  const [newTitle, setNewTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setIsSubmitting(true);
    await onCreate(newTitle);
    setNewTitle('');
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="relative mb-8">
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="Create a new Todo..."
        className="w-full pl-4 pr-24 py-4 bg-white border-0 ring-1 ring-gray-200 rounded-xl shadow-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 transition-all outline-none"
        disabled={isSubmitting}
      />
      <button 
        type="submit"
        disabled={!newTitle.trim() || isSubmitting}
        className={cn(
          "absolute right-2 top-2 bottom-2 px-4 rounded-lg font-medium transition-all duration-200",
          newTitle.trim() 
            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md" 
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        )}
      >
        {isSubmitting ? '...' : 'Add'}
      </button>
    </form>
  );
};