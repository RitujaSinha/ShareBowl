import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  HeartHandshake,
  User,
} from "lucide-react";

export default function Signup() {
  return (
    <div className="min-h-screen bg-[#FFF8EF] px-4 py-10 text-gray-900">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-600 text-white">
            <HeartHandshake size={28} strokeWidth={2.5} />
          </div>

          <p className="text-sm font-bold uppercase tracking-widest text-amber-600">
            ShareBowl Registration
          </p>

          <h1 className="mt-2 text-4xl font-black text-gray-900">
            Choose Your Account Type
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm font-medium text-gray-500">
            Join ShareBowl as an organisation or donor and help reduce food waste
            while supporting people in need.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700">
              <Building2 size={30} strokeWidth={2.5} />
            </div>

            <h2 className="text-2xl font-black text-gray-900">
              For Organisations
            </h2>

            <p className="mt-4 text-sm font-medium leading-7 text-gray-600">
              Join our mission to reduce food waste and help people in need by
              receiving and managing surplus food donations through ShareBowl.
            </p>

            <Link
              to="/signup/organizationsignup"
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 px-5 py-4 text-sm font-black text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700"
            >
              Register Organisation
              <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
          </div>

          <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-700">
              <User size={30} strokeWidth={2.5} />
            </div>

            <h2 className="text-2xl font-black text-gray-900">
              For Donors
            </h2>

            <p className="mt-4 text-sm font-medium leading-7 text-gray-600">
              Become a part of ShareBowl and help distribute meals, support
              communities, and spread hope one bowl at a time.
            </p>

            <Link
              to="/signup/donorsignup"
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-4 text-sm font-black text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
            >
              Register Donor
              <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}