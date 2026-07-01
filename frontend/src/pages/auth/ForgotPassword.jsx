import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import API_URL from "../../api";
import { ArrowLeft, Mail, Send, UserRound } from "lucide-react";

function ForgotPassword() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    role: "",
    email: "",
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

    if (!form.role || !form.email) {
      toast.error("Role and email are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Something went wrong");
        return;
      }

      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5FBF7] px-4">
      <div className="w-full max-w-md rounded-3xl border border-green-100 bg-white p-6 shadow-sm">
        <button
          onClick={() => navigate("/login")}
          className="mb-5 flex items-center gap-2 text-sm font-bold text-green-700"
        >
          <ArrowLeft size={17} />
          Back to Login
        </button>

        <h1 className="text-2xl font-black text-gray-900">
          Forgot Password
        </h1>

        <p className="mt-1 text-sm font-medium text-gray-500">
          Enter your role and email to receive a reset link.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-black text-gray-800">
              Role
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100">
              <UserRound size={18} className="text-gray-400" />

              <select
                id="role"
                value={form.role}
                onChange={handleChange}
                className="w-full bg-transparent text-sm font-semibold outline-none"
              >
                <option value="">Select Role</option>
                <option value="donor">Donor</option>
                <option value="organisation">Organisation</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-black text-gray-800">
              Email
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100">
              <Mail size={18} className="text-gray-400" />

              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="Enter registered email"
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
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;