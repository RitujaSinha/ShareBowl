import { useNavigate } from "react-router-dom";

function DonorDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, Donor 👋</h1>
        <p className="text-gray-600">
          Manage your donations and help reduce food waste
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Total Donations</h2>
          <p className="text-2xl font-bold mt-2">12</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Accepted</h2>
          <p className="text-2xl font-bold mt-2 text-green-600">8</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Pending</h2>
          <p className="text-2xl font-bold mt-2 text-yellow-500">4</p>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Add Donation */}
        <div
          onClick={() => navigate("/add-donation")}
          className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg hover:scale-105 transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            ➕ Add Donation
          </h2>
          <p className="text-gray-500">
            Donate food or groceries easily
          </p>
        </div>

        {/* My Donations */}
        <div
          onClick={() => navigate("/my-donations")}
          className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg hover:scale-105 transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            📦 My Donations
          </h2>
          <p className="text-gray-500">
            Track your donation status
          </p>
        </div>

      </div>
    </div>
  );
}

export default DonorDashboard;