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
      console.error(
        "Tentativa de usar loginWithGoogle no servidor. Isso deve ser chamado em um componente cliente."
      );
      return;
    }

    const authCallbackUrl = `${window.location.origin}/auth/callback`;
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: authCallbackUrl },
    });
    if (error) {
      console.error("Erro ao iniciar OAuth:", error);
      return;
    }

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
