import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API_URL from "../../api";
import {
  Building2,
  CheckCircle2,
  Hash,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
  XCircle,
} from "lucide-react";

function OrganisationRequests() {
  const [organisations, setOrganisations] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/organisations/pending`, {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to load requests");
        return;
      }

      setOrganisations(data.organisations || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load requests");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const approveOrganisation = async (id) => {
    try {
      const res = await fetch(`${API_URL}/admin/organisations/${id}/approve`, {
        method: "PATCH",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to approve");
        return;
      }

      toast.success(data.message);

      setOrganisations((prev) => prev.filter((org) => org._id !== id));
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const rejectOrganisation = async (id) => {
    try {
      const res = await fetch(`${API_URL}/admin/organisations/${id}/reject`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to reject");
        return;
      }

      toast.success(data.message);

      setOrganisations((prev) => prev.filter((org) => org._id !== id));
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
              <ShieldCheck size={26} strokeWidth={2.5} />
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-500">
                Admin Panel
              </p>

              <h1 className="text-2xl font-black text-gray-900">
                Organisation Requests
              </h1>

              <p className="text-sm font-medium text-gray-500">
                Review and manage organisation registrations
              </p>
            </div>
          </div>
        </div>

        {organisations.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
              <Building2 size={28} strokeWidth={2.5} />
            </div>

            <h3 className="text-lg font-black text-gray-900">
              No pending organisation requests
            </h3>

            <p className="mt-1 text-sm font-medium text-gray-500">
              New organisation signup requests will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {organisations.map((org) => (
              <div
                key={org._id}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                      <Building2 size={25} strokeWidth={2.5} />
                    </div>

                    <div>
                      <h2 className="text-xl font-black text-gray-900">
                        {org.organisationName}
                      </h2>

                      <p className="mt-1 text-sm font-bold text-green-700">
                        Pending Verification
                      </p>
                    </div>
                  </div>

                  <span className="w-fit rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-xs font-black text-amber-700">
                    Pending
                  </span>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-3">
                    <Hash
                      size={18}
                      strokeWidth={2.5}
                      className="mt-0.5 shrink-0 text-slate-700"
                    />

                    <div>
                      <p className="text-xs font-bold text-slate-700">
                        Organisation ID
                      </p>

                      <p className="text-sm font-black text-gray-900">
                        {org.organisationID || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl bg-blue-50 p-3">
                    <User
                      size={18}
                      strokeWidth={2.5}
                      className="mt-0.5 shrink-0 text-blue-700"
                    />

                    <div>
                      <p className="text-xs font-bold text-blue-700">Owner</p>

                      <p className="text-sm font-black text-gray-900">
                        {org.organisationOwner || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl bg-green-50 p-3">
                    <Mail
                      size={18}
                      strokeWidth={2.5}
                      className="mt-0.5 shrink-0 text-green-700"
                    />

                    <div>
                      <p className="text-xs font-bold text-green-700">Email</p>

                      <p className="text-sm font-black text-gray-900">
                        {org.email || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl bg-amber-50 p-3">
                    <Phone
                      size={18}
                      strokeWidth={2.5}
                      className="mt-0.5 shrink-0 text-amber-700"
                    />

                    <div>
                      <p className="text-xs font-bold text-amber-700">Phone</p>

                      <p className="text-sm font-black text-gray-900">
                        {org.phone || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-start gap-3 rounded-2xl bg-slate-50 p-3">
                  <MapPin
                    size={18}
                    strokeWidth={2.5}
                    className="mt-0.5 shrink-0 text-slate-700"
                  />

                  <div>
                    <p className="text-xs font-bold text-slate-700">
                      Address
                    </p>

                    <p className="text-sm font-black text-gray-900">
                      {org.street || "N/A"}, {org.city || "N/A"},{" "}
                      {org.district || "N/A"}, {org.state || "N/A"} -{" "}
                      {org.pincode || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
                  <button
                    onClick={() => approveOrganisation(org._id)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-green-700"
                  >
                    <CheckCircle2 size={17} strokeWidth={2.5} />
                    Approve
                  </button>

                  <button
                    onClick={() => rejectOrganisation(org._id)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-100"
                  >
                    <XCircle size={17} strokeWidth={2.5} />
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrganisationRequests;