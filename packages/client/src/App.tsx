import { SWRConfig } from 'swr';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TodoList } from './components/TodoList';
import { fetcher } from './lib/axios';
import { useState, type JSX } from 'react';
import { cn } from './lib/utils';

const LoginScreen = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !pass.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await login(email, pass);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error = err as { response?: { status: number }; code?: string };
      if (error.response?.status === 401) {
        setError("User or password are incorrect.");
      } else if (error.code === "ERR_NETWORK") {
        setError("Could not connect to server.");
      } else {
        setError("Unexpected error occurred.");
      }
      setIsSubmitting(false);
    }
  }
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm border border-gray-100">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Welcome</h2>
          <p className="text-sm text-gray-500">Login to see your Todos</p>
        </div>

        {/* Mensaje de Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-center gap-2 animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }} 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="••••••••"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
                setError(null);
              }}
            />
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "w-full py-2.5 rounded-lg font-medium text-white transition-all shadow-sm",
              isSubmitting 
                ? "bg-blue-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-md"
            )}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loging in...
              </span>
            ) : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
};

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div>Loading session...</div>;
  return isAuthenticated ? children : <LoginScreen />;
};

function App() {
  return (
    // Global config for SWR
    <SWRConfig 
      value={{
        fetcher,
        revalidateOnFocus: true, // Revalidate when going back to the app
        dedupingInterval: 2000,
        onError: (error) => {
          if (error.response?.status === 401 || error.response?.status === 403) {
            // Should force logout when session expires
            console.warn("Expired session");
          }
        }
      }}
    >
      <AuthProvider>
        <ProtectedRoute>
          <TodoList />
        </ProtectedRoute>
      </AuthProvider>
    </SWRConfig>
  );
}

export default App;