'use client';

import NewAccountForm from '../features/auth/components/newAccountForm';

export default function NewAccountPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">TaskHub Pro</h1>
        <NewAccountForm/>
      </div>
    </div>
  );
}
