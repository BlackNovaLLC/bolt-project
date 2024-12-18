import React from 'react';
import { MessageSquare } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { useAuthStore } from '../../store/authStore';

export function AuthContainer() {
  const [isLogin, setIsLogin] = React.useState(true);
  const { error, clearError } = useAuthStore();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    if (error) clearError();
  };

  return (
    <div className="min-h-screen bg-[#343541] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <MessageSquare className="h-12 w-12 text-[#10a37f]" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#ececf1]">
          {isLogin ? 'Sign in to your account' : 'Create your account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#40414f] py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded relative">
              <p className="block sm:inline">{error}</p>
            </div>
          )}

          {isLogin ? <LoginForm /> : <RegisterForm />}

          <div className="mt-6">
            <button
              onClick={toggleForm}
              className="w-full text-center text-sm text-gray-400 hover:text-[#ececf1] transition-colors"
            >
              {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}