'use client';

import { AuthService } from '@/app/features/auth/authService';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';

export default function GoogleButton() {
  const handleGoogleLogin = async () => {
    try {
      await AuthService.loginWithGoogle();
    } catch (error: any) {
      alert(error.message);
      console.error('Erro ao entrar com google', error)
    }
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-2 border"
      variant="outline"
    >
      <FcGoogle size={20} /> <span>Entrar com Google</span>
    </Button>
  );
}
