"use client";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { logout } from "../features/auth/authSlice";
import router from "next/router";

export default function DashboardClient({ user, profile }: any) {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    dispatch(logout());
    router.push("login")
  };

  return (
    <div className="p-6">
      <h1>Bem-vindo, {user.email}</h1>

      <pre>{JSON.stringify(profile, null, 2)}</pre>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded-md mt-6 cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}
