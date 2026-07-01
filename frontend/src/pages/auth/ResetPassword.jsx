import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import API_URL from "../../api";
import { Lock, Send } from "lucide-react";

function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [searchParams] = useSearchParams();

  const role = searchParams.get("role");

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.password || !form.confirmPassword) {
      toast.error("Both password fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!role) {
      toast.error("Invalid reset link");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/auth/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: form.password,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Password reset failed");
        return;
      }

      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5FBF7] px-4">
      <div className="w-full max-w-md rounded-3xl border border-green-100 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-black text-gray-900">
          Reset Password
        </h1>

        <p className="mt-1 text-sm font-medium text-gray-500">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-black text-gray-800">
              New Password
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100">
              <Lock size={18} className="text-gray-400" />

              <input
                id="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-black text-gray-800">
              Confirm Password
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100">
              <Lock size={18} className="text-gray-400" />

              <input
                id="confirmPassword"
                type="password"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 px-5 py-4 text-sm font-black text-white hover:bg-green-700 disabled:opacity-70"
          >
            <Send size={18} />
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;