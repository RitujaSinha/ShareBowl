import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function OrganisationRequests() {
  const [organisations, setOrganisations] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/admin/organisations/pending",
        {
          credentials: "include",
        }
      );

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
      const res = await fetch(
        `http://localhost:5000/api/admin/organisations/${id}/approve`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to approve");
        return;
      }

      toast.success(data.message);

      setOrganisations((prev) =>
        prev.filter((org) => org._id !== id)
      );
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const rejectOrganisation = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/organisations/${id}/reject`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to reject");
        return;
      }

      toast.success(data.message);

      setOrganisations((prev) =>
        prev.filter((org) => org._id !== id)
      );
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-indigo-500">
          Organisation Requests
        </h1>

        <p className="mt-2 text-zinc-400">
          Review and manage organisation registrations
        </p>
      </div>

      {organisations.length === 0 ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-400">
          No pending organisation requests
        </div>
      ) : (
        <div className="grid gap-6">
          {organisations.map((org) => (
            <div
              key={org._id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <h2 className="text-2xl font-bold mb-3">
                {org.organisationName}
              </h2>

              <div className="space-y-2 text-zinc-300">
                <p>
                  <span className="font-semibold text-white">
                    Organisation ID:
                  </span>{" "}
                  {org.organisationID}
                </p>

                <p>
                  <span className="font-semibold text-white">
                    Owner:
                  </span>{" "}
                  {org.organisationOwner}
                </p>

                <p>
                  <span className="font-semibold text-white">
                    Email:
                  </span>{" "}
                  {org.email}
                </p>

                <p>
                  <span className="font-semibold text-white">
                    Phone:
                  </span>{" "}
                  {org.phone}
                </p>

                <p>
                  <span className="font-semibold text-white">
                    Address:
                  </span>{" "}
                  {org.street}, {org.city}, {org.district},{" "}
                  {org.state} - {org.pincode}
                </p>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() =>
                    approveOrganisation(org._id)
                  }
                  className="rounded-lg bg-green-600 px-5 py-2 font-semibold hover:bg-green-500"
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    rejectOrganisation(org._id)
                  }
                  className="rounded-lg bg-red-600 px-5 py-2 font-semibold hover:bg-red-500"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrganisationRequests;