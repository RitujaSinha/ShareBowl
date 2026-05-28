import React from "react";
import {
  LayoutDashboard,
  PackageCheck,
  Clock3,
  LogOut,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // logout
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const btnClass = (active) =>
    `flex items-center gap-4 rounded-xl px-5 py-4 text-lg transition ${
      active
        ? "bg-indigo-600 text-white"
        : "hover:bg-zinc-800 text-zinc-300"
    }`;

  return (
    <div className="w-72 border-r border-zinc-800 bg-zinc-900 p-6">

      {/* Logo */}
      <h1 className="mb-12 text-4xl font-bold text-indigo-500">
        ShareBowl
      </h1>

      {/* Menu */}
      <div className="flex flex-col gap-4">

        <button
          onClick={() => navigate("/organisation-dashboard")}
          className={btnClass(isActive("/organisation-dashboard"))}
        >
          <LayoutDashboard size={24} />
          Dashboard
        </button>

        <button
          onClick={() => navigate("/pending-donations")}
          className={btnClass(isActive("/pending-donations"))}
        >
          <Clock3 size={24} />
          Pending Donations
        </button>

        <button
          onClick={() => navigate("/accepted-donations")}
          className={btnClass(isActive("/accepted-donations"))}
        >
          <PackageCheck size={24} />
          Accepted Donations
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