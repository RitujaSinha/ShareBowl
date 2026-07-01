import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import API_URL from "../../api";
import { ArrowLeft, KeyRound, Lock, Mail, Send, UserRound } from "lucide-react";

function ForgotPassword() {
  const navigate = useNavigate();

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    role: "",
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const sendOtp = async (e) => {
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
        body: JSON.stringify({
          role: form.role,
          email: form.email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to send OTP");
        return;
      }

      toast.success(data.message);
      setOtpSent(true);
    } catch (error) {
      console.log(error);
      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();

    if (!form.otp || !form.password || !form.confirmPassword) {
      toast.error("OTP and password fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/auth/verify-reset-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: form.role,
          email: form.email,
          otp: form.otp,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to reset password");
        return;
      }

      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Failed to reset password");
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
          {otpSent
            ? "Enter the OTP sent to your email and create a new password."
            : "Enter your role and email to receive an OTP."}
        </p>

        <form
          onSubmit={otpSent ? resetPassword : sendOtp}
          className="mt-6 space-y-4"
        >
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
                disabled={otpSent}
                className="w-full bg-transparent text-sm font-semibold outline-none disabled:text-gray-400"
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
                disabled={otpSent}
                placeholder="Enter registered email"
                className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-gray-400 disabled:text-gray-400"
              />
            </div>
          </div>

          {otpSent && (
            <>
              <div>
                <label className="mb-2 block text-sm font-black text-gray-800">
                  OTP
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100">
                  <KeyRound size={18} className="text-gray-400" />

                  <input
                    id="otp"
                    type="text"
                    required
                    maxLength="6"
                    value={form.otp}
                    onChange={handleChange}
                    placeholder="Enter 6-digit OTP"
                    className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-gray-400"
                  />
                </div>
              </div>

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
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 px-5 py-4 text-sm font-black text-white hover:bg-green-700 disabled:opacity-70"
          >
            <Send size={18} />
            {loading
              ? otpSent
                ? "Resetting..."
                : "Sending..."
              : otpSent
              ? "Reset Password"
              : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;