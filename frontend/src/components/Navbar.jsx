import React from "react";
import { Link } from "react-router-dom";
import { HeartHandshake } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-orange-100 bg-white/90 px-4 py-4 shadow-sm backdrop-blur-xl sm:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-600 text-white shadow-sm">
            <HeartHandshake size={24} strokeWidth={2.5} />
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-tight text-gray-900">
              ShareBowl
            </h1>
            <p className="hidden text-xs font-bold uppercase tracking-wider text-green-700 sm:block">
              Share Food. Spread Hope.
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-xl border border-green-200 bg-green-50 px-5 py-2 text-sm font-bold text-green-700 transition hover:bg-green-100"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-xl bg-orange-500 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}