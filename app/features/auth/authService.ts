// src/features/auth/AuthService.ts
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const AuthService = {
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data.user;
  },

  async signup(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data.user;
  },

  async loginWithGoogle() {
    if (typeof window === "undefined") {
      // Se estiver no servidor, não deve prosseguir com o redirecionamento baseado em window.location
      console.error(
        "Tentativa de usar loginWithGoogle no servidor. Isso deve ser chamado em um componente cliente."
      );
      return;
    }

    // 1. Definição do URL de Callback APENAS quando 'window' está disponível (no navegador).
    const authCallbackUrl = `${window.location.origin}/auth/callback`;
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: authCallbackUrl },
    });
    if (error) {
      console.error("Erro ao iniciar OAuth:", error);
      return;
    }
    // Redireciona o navegador para a URL de login do Google
    window.location.href = data.url;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data } = await supabase.auth.getUser();
    return data.user;
  },
};
