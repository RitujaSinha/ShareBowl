import React from "react";
import Sidebar from "../../components/organisation/Sidebar";

export default function OrganisationDashboard() {
  return (
    <div className="flex min-h-screen bg-black text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">

        {/* Top Section */}
        <div className="mb-10 flex items-center justify-between">

          <div>

            <h2 className="text-5xl font-bold">
              Organisation Dashboard
            </h2>

            <p className="mt-2 text-zinc-400">
              Welcome back 👋
            </p>

          </div>

          {/* Profile */}
          <div className="rounded-2xl border border-zinc-700 bg-zinc-900 px-6 py-4">

            <p className="text-lg font-semibold">
              Hope Foundation
            </p>

            <p className="text-sm text-zinc-400">
              NGO Organisation
            </p>

          </div>

        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {/* Total Donations */}
          <div className="rounded-3xl border border-indigo-800 bg-zinc-900 p-6 shadow-[0_0_20px_rgba(99,102,241,0.15)]">

            <p className="text-zinc-400">
              Total Donations
            </p>

            <h3 className="mt-4 text-5xl font-bold text-indigo-500">
              128
            </h3>

          </div>

          {/* Pending */}
          <div className="rounded-3xl border border-yellow-700 bg-zinc-900 p-6 shadow-[0_0_20px_rgba(250,204,21,0.15)]">

            <p className="text-zinc-400">
              Pending Requests
            </p>

            <h3 className="mt-4 text-5xl font-bold text-yellow-400">
              24
            </h3>

          </div>

          {/* Distributed */}
          <div className="rounded-3xl border border-green-700 bg-zinc-900 p-6 shadow-[0_0_20px_rgba(34,197,94,0.15)]">

            <p className="text-zinc-400">
              Meals Distributed
            </p>

            <h3 className="mt-4 text-5xl font-bold text-green-500">
              950
            </h3>

          </div>

          {/* Donors */}
          <div className="rounded-3xl border border-pink-700 bg-zinc-900 p-6 shadow-[0_0_20px_rgba(236,72,153,0.15)]">

            <p className="text-zinc-400">
              Active Donors
            </p>

            <h3 className="mt-4 text-5xl font-bold text-pink-500">
              52
            </h3>

          </div>

        </div>

        {/* Recent Donations */}
        <div className="mt-12 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

          {/* Header */}
          <div className="mb-8 flex items-center justify-between">

            <h3 className="text-3xl font-bold">
              Recent Donations
            </h3>

            <button className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold transition hover:bg-indigo-500">

              View All
            </button>

          </div>

          {/* Table */}
          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead>

                <tr className="border-b border-zinc-700 text-left text-zinc-400">

                  <th className="pb-4">Donor</th>

                  <th className="pb-4">Food Type</th>

                  <th className="pb-4">Quantity</th>

                  <th className="pb-4">Status</th>

                  <th className="pb-4">Action</th>

                </tr>

              </thead>

              <tbody>

                {/* Row 1 */}
                <tr className="border-b border-zinc-800">

                  <td className="py-5">
                    Rahul Sharma
                  </td>

                  <td>
                    Rice Meals
                  </td>

                  <td>
                    20 Packs
                  </td>

                  <td>

                    <span className="rounded-full bg-yellow-500/20 px-4 py-2 text-sm text-yellow-400">

                      Pending
                    </span>

                  </td>

                  <td>

                    <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold transition hover:bg-green-500">

                      Accept
                    </button>

                  </td>

                </tr>

                {/* Row 2 */}
                <tr className="border-b border-zinc-800">

                  <td className="py-5">
                    Hotel Taj
                  </td>

                  <td>
                    Bread & Curry
                  </td>

                  <td>
                    50 Packs
                  </td>

                  <td>

                    <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm text-green-400">

                      Accepted
                    </span>

                  </td>

                  <td>

                    <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold transition hover:bg-indigo-500">

                      View
                    </button>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
}