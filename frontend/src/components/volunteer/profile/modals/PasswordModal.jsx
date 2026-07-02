import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";

export default function PasswordModal({ onClose }) {
  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async () => {
    if (!form.current_password) return setError("Current password is required");
    if (!form.new_password) return setError("New password is required");
    if (form.new_password.length < 6) return setError("Password must be at least 6 characters");
    if (form.new_password !== form.confirm_password) return setError("Passwords do not match");
    
    try {    
      setLoading(true);
      setError("");
      const res = await fetch("http://localhost:3000/api/auth/password", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          current_password: form.current_password,
          new_password: form.new_password,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("Password updated successfully!");
        setForm({ current_password: "", new_password: "", confirm_password: "" });
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
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
       
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-800">Change Password</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X size={18} />
          </button>
        </div>

    
        <div className="space-y-4">
         
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Current Password
            </label>
            <div className="relative">
              <input
                name="current_password"
                type={show.current ? "text" : "password"}
                value={form.current_password}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[#4b4949] text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => setShow({ ...show, current: !show.current })}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {show.current ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
 
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              New Password
            </label>
            <div className="relative">
              <input
                name="new_password"
                type={show.new ? "text" : "password"}
                value={form.new_password}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[#4b4949] text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => setShow({ ...show, new: !show.new })}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {show.new ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                name="confirm_password"
                type={show.confirm ? "text" : "password"}
                value={form.confirm_password}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[#4b4949] text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => setShow({ ...show, confirm: !show.confirm })}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {show.confirm ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}
          {success && <p className="text-xs text-green-500">{success}</p>}
        </div>

        
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2 border border-gray-200 text-gray-600 text-sm rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>
    </div>
  );
}