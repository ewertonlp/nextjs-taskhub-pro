import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function LogoutPage() {
  const supabase = await createClient();

  // Encerra a sessão no Supabase
  await supabase.auth.signOut();

  // Redireciona para login
  redirect("/login");

  return null;
}
