import { useNavigate } from "react-router-dom";

function DonorDashboard() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome, Donor 👋</h1>
      <p style={styles.subtext}>
        Help reduce waste by donating food and groceries
      </p>

      <div style={styles.cardContainer}>
        <div style={styles.card} onClick={() => navigate("/add-donation")}>
          <h2>➕ Add Donation</h2>
          <p>Donate food or groceries easily</p>
        </div>

        <div style={styles.card} onClick={() => navigate("/my-donations")}>
          <h2>📦 My Donations</h2>
          <p>Track your donation status</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
    fontFamily: "Arial",
    background: "#f5f7fa",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "32px",
    marginBottom: "10px",
  },
  subtext: {
    color: "#555",
    marginBottom: "30px",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  card: {
    background: "white",
    padding: "25px",
    width: "250px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default DonorDashboard;