"use client";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const TaskService = {
  async list() {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },
  
  async add(task: {title: string; description: string; user_id: string }) {
      const { data, error } = await supabase.from("tasks").insert(task).select()
      if (error) throw error
      return data[0];
    },

  async update(id: string, updates: Partial<{ title: string; description: string;completed: boolean}>) {
    const { data, error} = await supabase.from("tasks").update(updates).eq("id", id).select()
    if (error) throw error
      return data[0]
  },

  async remove(id: string) {
    const { error} = await supabase.from("tasks").delete().eq("id", id)
    if (error) throw error;
  }
};