import { useAuth } from '../context/AuthContext';

export const TodoHeader = () => {
  const { user, logout } = useAuth();

  const displayUserName = user?.name || user?.email || 'User';

  return (
    <div className="bg-white p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 z-10 mb-6 rounded-t-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Todos</h1>
        <p className="text-sm text-gray-500">Hey, {displayUserName}</p>
      </div>
      <button 
        onClick={logout}
        className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors px-4 py-2 rounded-lg hover:bg-red-50"
      >
        Logout
      </button>
    </div>
  );
};