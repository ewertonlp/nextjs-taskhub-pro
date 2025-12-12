import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await createClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Erro na troca de código:", error.message);

      return NextResponse.redirect(
        `${requestUrl.origin}/login?error=auth_failed`
      );
    }

    return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
  }

  return NextResponse.redirect(`${requestUrl.origin}/login`);
}
