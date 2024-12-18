import React, { useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import type { UserRole } from '../../types/auth';

const ROLES: UserRole[] = [
  'Jr. Media Buyer',
  'Sr. Media Buyer',
  'Jr. Copywriter',
  'Sr. Copywriter',
  'Jr. Creative Designer',
  'Lead Creative Designer',
  'Developer',
  'Owner',
];

export function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    role: 'Jr. Media Buyer' as UserRole,
  });
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const { signUp, loading, error, clearError } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameError) return;

    try {
      await signUp(
        formData.email,
        formData.password,
        formData.username,
        formData.role
      );
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) clearError();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 text-sm text-red-400 bg-red-500/10 rounded-lg flex items-center">
          <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#ececf1]">
          Email address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg bg-[#202123] border border-gray-600 
          text-[#ececf1] shadow-sm focus:border-[#10a37f] focus:ring-[#10a37f] sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="username" className="block text-sm font-medium text-[#ececf1]">
          Username
        </label>
        <input
          id="username"
          type="text"
          name="username"
          required
          value={formData.username}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg bg-[#202123] border border-gray-600 
          text-[#ececf1] shadow-sm focus:border-[#10a37f] focus:ring-[#10a37f] sm:text-sm"
        />
        {usernameError && (
          <p className="mt-1 text-sm text-red-400">{usernameError}</p>
        )}
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-[#ececf1]">
          Role
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg bg-[#202123] border border-gray-600 
          text-[#ececf1] shadow-sm focus:border-[#10a37f] focus:ring-[#10a37f] sm:text-sm"
        >
          {ROLES.map(role => (
            <option key={role} value={role} className="bg-[#202123]">
              {role}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-[#ececf1]">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg bg-[#202123] border border-gray-600 
          text-[#ececf1] shadow-sm focus:border-[#10a37f] focus:ring-[#10a37f] sm:text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={loading || !!usernameError}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg 
        shadow-sm text-sm font-medium text-white bg-[#10a37f] hover:bg-[#0e906f] 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#10a37f] 
        disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <div className="flex items-center">
            <Loader2 className="animate-spin h-4 w-4 mr-2" />
            Creating account...
          </div>
        ) : (
          'Create account'
        )}
      </button>
    </form>
  );
}