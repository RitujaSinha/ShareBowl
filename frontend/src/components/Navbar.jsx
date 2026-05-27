import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 bg-black shadow-sm">

      {/* Logo */}
      <Link
        to="/"
        className="text-3xl font-bold text-[#00f75b]"
      >
        ShareBowl
      </Link>

      {/* Buttons */}
      <div className="flex items-center gap-4">

        <Link
          to="/login"
          className="px-5 py-2 rounded-xl bg-[#0bf551] text-white font-medium"
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="px-5 py-2 rounded-xl bg-[#F59E0B] text-white font-medium"
        >
          Register
        </Link>

      </div>
    </nav>
  );
}