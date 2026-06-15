import React from "react";
import {
  CheckCircle2,
  Clock3,
  HeartHandshake,
  LayoutDashboard,
  LogOut,
  PackageCheck,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import API_URL from "../../api";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await fetch( `${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const menuItems = [
    {
      label: "Dashboard",
      path: "/organisation-dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "All Donations",
      path: "/org-donations",
      icon: PackageCheck,
    },
    {
      label: "Pending",
      path: "/pending-donations",
      icon: Clock3,
    },
    {
      label: "Accepted",
      path: "/accepted-donations",
      icon: CheckCircle2,
    },
  ];

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-green-100 bg-white px-4 py-5 shadow-sm lg:block">
      <div className="mb-6 flex items-center gap-3 rounded-2xl bg-green-50 p-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-white">
          <HeartHandshake size={24} strokeWidth={2.5} />
        </div>

        <div>
          <h1 className="text-lg font-black text-gray-900">
            ShareBowl
          </h1>

          <p className="text-xs font-bold uppercase tracking-wider text-green-700">
            Organisation
          </p>
        </div>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate(item.path)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition ${
                active
                  ? "bg-green-600 text-white shadow-md shadow-green-600/20"
                  : "text-gray-600 hover:bg-green-50 hover:text-green-700"
              }`}
            >
              <Icon size={19} strokeWidth={2.5} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-6 rounded-2xl border border-green-100 bg-[#F5FBF7] p-4">
        <p className="text-sm font-black text-gray-900">
          Donation Center
        </p>

        <p className="mt-1 text-xs font-medium text-gray-500">
          Manage donor requests and accepted donations.
        </p>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="absolute bottom-5 left-4 right-4 flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
      >
        <LogOut size={18} strokeWidth={2.5} />
        Logout
      </button>
    </aside>
  );
}