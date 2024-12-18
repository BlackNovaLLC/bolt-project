import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Loader2 } from 'lucide-react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, loading } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#ececf1]">
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-lg bg-[#202123] border border-gray-600 
          text-[#ececf1] shadow-sm focus:border-[#10a37f] focus:ring-[#10a37f] sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-[#ececf1]">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-lg bg-[#202123] border border-gray-600 
          text-[#ececf1] shadow-sm focus:border-[#10a37f] focus:ring-[#10a37f] sm:text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg 
        shadow-sm text-sm font-medium text-white bg-[#10a37f] hover:bg-[#0e906f] 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#10a37f] 
        disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <div className="flex items-center">
            <Loader2 className="animate-spin h-4 w-4 mr-2" />
            Signing in...
          </div>
        ) : (
          'Sign in'
        )}
      </button>
    </form>
  );
}