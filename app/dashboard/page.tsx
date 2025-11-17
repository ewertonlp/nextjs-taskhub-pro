import { createClient } from "@/utils/supabase/server";
import DashboardClient from "./dashboardClient";
import Logout from "./logout";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select()
    .eq("id", user!.id)
    .single();

  return (
    <>
    <DashboardClient user={user} profile={profile} />
    </>
  );
}
