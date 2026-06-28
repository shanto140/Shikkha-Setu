import { useState } from "react";
import { X, Mail, ArrowRight } from "lucide-react";

export default function ForgotPasswordModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim()) return setError("Email is required");
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) return setError("Invalid email format");

    try {
      setLoading(true);
      setError("");
      const res = await fetch(
        "http://localhost:3000/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
        {/* <div className="flex items-start justify-between mb-6">
          
        </div> */}

        {success ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail size={28} className="text-green-500" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">
              Check your email!
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              We sent a password reset link to{" "}
              <span className="font-medium text-gray-700">{email}</span>
            </p>
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-xl transition font-medium"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-l font-semibold text-gray-800">
              Enter your email and we'll send you a reset link
            </p>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1.5 block">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="your@email.com"
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-xl transition font-medium disabled:opacity-50"
            >
              {loading ? (
                "Sending..."
              ) : (
                <>
                  Send Reset Link <ArrowRight size={15} />
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="w-full py-2.5 border border-gray-200 text-gray-600 text-sm rounded-xl hover:bg-gray-50 transition"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
