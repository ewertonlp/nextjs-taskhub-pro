'use client';

import { AuthService } from '@/app/features/auth/authService';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

export default function GoogleButton() {
  const handleGoogleLogin = async () => {
    try {
      await AuthService.loginWithGoogle();
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to sign in. Try again.";
          console.error('Erro ao entrar com google', error)
          toast.error(message);
        }
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-2 border"
      variant="outline"
    >
      <FcGoogle size={20} /> <span>Google</span>
    </Button>
  );
}
