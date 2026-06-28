import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, CheckCircle } from "lucide-react";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [form, setForm] = useState({ new_password: "", confirm_password: "" });
  const [show, setShow] = useState({ new: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!form.new_password) return setError("Password is required");
    if (form.new_password.length < 6)
      return setError("Password must be at least 6 characters");
    if (form.new_password !== form.confirm_password)
      return setError("Passwords do not match");

    try {
      setLoading(true);
      setError("");
      const res = await fetch("http://localhost:3000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, new_password: form.new_password }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md text-center">
          <p className="text-red-500 font-medium">Invalid reset link</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 text-sm text-blue-600 hover:underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md">
        {success ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={28} className="text-green-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              Password Reset!
            </h2>
            <p className="text-sm text-gray-500">
              Redirecting to login page in 3 seconds...
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Lock size={22} className="text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Set New Password
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Enter your new password below
              </p>
            </div>

           
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1.5 block">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={show.new ? "text" : "password"}
                    value={form.new_password}
                    onChange={(e) => {
                      setForm({ ...form, new_password: e.target.value });
                      setError("");
                    }}
                    placeholder="Min. 6 characters"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => setShow({ ...show, new: !show.new })}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {show.new ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600 mb-1.5 block">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={show.confirm ? "text" : "password"}
                    value={form.confirm_password}
                    onChange={(e) => {
                      setForm({ ...form, confirm_password: e.target.value });
                      setError("");
                    }}
                    placeholder="Re-enter password"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => setShow({ ...show, confirm: !show.confirm })}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {show.confirm ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {error && <p className="text-xs text-red-500">{error}</p>}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-xl transition font-medium disabled:opacity-50"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>

              <button
                onClick={() => navigate("/login")}
                className="w-full py-2.5 border border-gray-200 text-gray-600 text-sm rounded-xl hover:bg-gray-50 transition"
              >
                Back to Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
