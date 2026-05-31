import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

export default function Home() {
  const heroImage =
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80";

  return (
    <div className="min-h-screen bg-[#FFF8EF] text-gray-900">
      <Navbar />

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-bold text-orange-700">
              Share Food. Spread Hope.
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              One Bowl.
              <br />
              One Smile.
              <br />
              One Change.
            </h1>

            <p className="mt-6 max-w-xl text-base font-semibold leading-7 text-gray-600">
              ShareBowl connects surplus food with people in need, turning every
              extra meal into hope, care, and a chance to fight hunger together.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/login"
                className="rounded-2xl border border-green-200 bg-green-50 px-8 py-3 text-center text-base font-black text-green-700 transition hover:bg-green-100"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="rounded-2xl bg-orange-500 px-8 py-3 text-center text-base font-black text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
              >
                Register
              </Link>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
                <p className="text-2xl font-black text-orange-600">1.3B</p>
                <p className="mt-1 text-xs font-bold text-gray-500">
                  Tons food wasted yearly
                </p>
              </div>

              <div className="rounded-2xl border border-green-100 bg-white p-4 shadow-sm">
                <p className="text-2xl font-black text-green-700">100%</p>
                <p className="mt-1 text-xs font-bold text-gray-500">
                  Community focused
                </p>
              </div>

              <div className="rounded-2xl border border-amber-100 bg-white p-4 shadow-sm">
                <p className="text-2xl font-black text-amber-600">24/7</p>
                <p className="mt-1 text-xs font-bold text-gray-500">
                  Donation access
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-xl text-sm font-semibold text-amber-700">
              Every extra meal can become someone’s hope for the day.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-5 -top-5 h-32 w-32 rounded-full bg-orange-200/50 blur-3xl" />
            <div className="absolute -bottom-5 -right-5 h-32 w-32 rounded-full bg-green-200/50 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-3 shadow-2xl shadow-orange-900/10">
              <img
                src={heroImage}
                alt="ShareBowl food donation"
                className="h-[480px] w-full rounded-[1.5rem] object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}