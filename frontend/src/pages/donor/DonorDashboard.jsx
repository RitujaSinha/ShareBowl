import { useNavigate } from "react-router-dom";

function DonorDashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Donor Dashboard</h1>

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button onClick={() => navigate("/add-donation")}>
          Add Donation
        </button>

        <button onClick={() => navigate("/my-donations")}>
          My Donations
        </button>
      </div>
    </div>
  );
}

export default DonorDashboard;