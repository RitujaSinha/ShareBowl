import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API_URL from "../api";

export default function PublicRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok || !data.user) {
          setUser(null);
          return;
        }

        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } catch (err) {
        console.log(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user?.role === "donor") {
    return <Navigate to="/donor" replace />;
  }

  if (user?.role === "organisation") {
    return <Navigate to="/organisation-dashboard" replace />;
  }

  if (user?.role === "admin") {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return children;
}