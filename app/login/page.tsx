'use client';

import LoginForm from '@/app/features/auth/components/loginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">TaskHub Pro</h1>
        <LoginForm />
      </div>
    </div>
  );
}
