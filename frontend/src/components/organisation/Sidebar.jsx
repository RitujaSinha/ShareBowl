import React from "react";
import {
  LayoutDashboard,
  PackageCheck,
  Clock3,
  LogOut,
  HandHelping,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function Sidebar() {

  const navigate = useNavigate();

  // logout
  const handleLogout = async () => {

  try {

    await fetch(
      "http://localhost:5000/api/auth/logout",
      {
        method: "POST",

        credentials: "include",
      }
    );

    localStorage.removeItem("user");
    navigate("/login");

  } catch (error) {
    console.log(error);
  }
 };

  return (

    <div className="w-72 border-r border-zinc-800 bg-zinc-900 p-6">

      {/* Logo */}
      <h1 className="mb-12 text-4xl font-bold text-indigo-500">
        ShareBowl
      </h1>

      {/* Menu */}
      <div className="flex flex-col gap-4">

        {/* Dashboard */}
        <button
          onClick={() => navigate("/organisation-dashboard")}
          className="flex items-center gap-4 rounded-xl bg-indigo-600 px-5 py-4 text-lg font-semibold transition hover:bg-indigo-500"
        >
          <LayoutDashboard size={24} />
          Dashboard
        </button>

        {/* Pending */}
        <button
          onClick={() => navigate("/pending-donations")}
          className="flex items-center gap-4 rounded-xl px-5 py-4 text-lg transition hover:bg-zinc-800"
        >
          <Clock3 size={24} />
          Pending Donations
        </button>

        {/* Accepted */}
        <button
          onClick={() => navigate("/accepted-donations")}
          className="flex items-center gap-4 rounded-xl px-5 py-4 text-lg transition hover:bg-zinc-800"
        >
          <PackageCheck size={24} />
          Accepted Donations
        </button>

        {/* Requests */}
        <button
          onClick={() => navigate("/request-donations")}
          className="flex items-center gap-4 rounded-xl px-5 py-4 text-lg transition hover:bg-zinc-800"
        >
          <HandHelping size={24} />
          Request Donations
        </button>

      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-20 flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 py-4 text-lg font-semibold transition hover:bg-red-500"
      >
        <LogOut size={22} />
        Logout
      </button>

    </div>
  );
}