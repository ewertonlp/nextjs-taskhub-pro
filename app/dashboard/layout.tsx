// app/dashboard/layout.tsx
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SidebarClient from "./SidebarClient";
import Header from "./components/header";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  // pega o usuário pelo cookie/session no server
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // pega info do perfil (opcional)
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, avatar_url")
    .eq("id", user.id)
    .single();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      {/* Sidebar (client) recebe user + profile */}
      <SidebarClient user={user} profile={profile} />

      {/* Main content area (empurrado para direita da sidebar) */}
      <main className="ml-72 md:ml-72 p-6 transition-all">
        {/* Topbar (opcional) */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
        </div>

        {/* Conteúdo das páginas filhas */}
        <div>{children}</div>
      </main>
    </div>
  );
}
