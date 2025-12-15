import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Header from "./components/header";
import SidebarRight from "./sideBarRight";
import SidebarLeft from "./sideBarLeft";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  // pega o usuário pelo cookie/session no server
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }
 
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, avatar_url")
    .eq("id", user.id)
    .single();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <SidebarLeft user={user} profile={profile} />
      <main className="lg:ml-68 mr-auto lg:mr-[300px] md:mt-16 p-6 transition-all">
        <div>{children}</div>
      </main>
      <div className="hidden xl:block">
      <SidebarRight />
      </div>
    </div>
  );
}
