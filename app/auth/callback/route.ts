// app/auth/callback/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server'; 

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    // 1. Cria o cliente de servidor para trocar o código
    const supabase = await createClient();
    
    // 2. Troca o código pela sessão. O createServerClient garante que os cookies
    //    de sessão sejam escritos no cabeçalho da resposta automaticamente.
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
        console.error("Erro na troca de código:", error.message);
        // Tratar erro e redirecionar para login
        return NextResponse.redirect(`${requestUrl.origin}/login?error=auth_failed`);
    }
    
    // 3. Redirecionamento final para a rota protegida
    return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
  }

  // Redireciona para uma página de erro ou login se o código não estiver presente
  return NextResponse.redirect(`${requestUrl.origin}/login`); 
}