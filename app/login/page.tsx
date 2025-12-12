'use client';

import LoginForm from '@/app/features/auth/components/loginForm';

export default function LoginPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen items-center justify-center bg-gray-50 dark:bg-slate-900">
      <div className="max-w-md w-full space-y-6 mx-auto">
        <h2 className="text-4xl font-light text-center text-gray-900 dark:text-slate-200">Welcome Back!</h2>
        <LoginForm />
      </div>

      <div className='hidden md:flex h-screen bg-white justify-center items-center'>
        <div className='text-center'>
          <h2 className='text-7xl font-semibold text-slate-800'>TaskHub Pro</h2>
        </div>

      </div>
    </div>
  );
}
