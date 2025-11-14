import { createClient } from "@/utils/supabase/server";
import DashboardClient from "./dashboardClient";

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
    <DashboardClient user={user} profile={profile} />
  );
}
