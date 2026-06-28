import { useState } from "react";
import { X } from "lucide-react";

export default function VolunteerInfoModal({ profile, onClose, onSuccess }) {
  const [form, setForm] = useState({
    university_name: profile?.university_name || "",
    department: profile?.department || "",
    academic_year: profile?.academic_year || "",
    bio: profile?.bio || "",
    experience_text: profile?.experience_text || "",
    district: profile?.district || "",
    upazila: profile?.upazila || "",
    address: profile?.address || "",
    teaching_mode: profile?.teaching_mode || "both",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.university_name.trim()) return setError("University name is required");
    if (!form.department.trim()) return setError("Department is required");
    if (!form.district.trim()) return setError("District is required");
    if (!form.teaching_mode) return setError("Teaching mode is required");

    try {
      setLoading(true);
      setError("");
      const res = await fetch("http://localhost:3000/api/volunteers/profile", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        onSuccess();
        onClose();
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
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md max-h-[85vh] overflow-y-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white">
          <h2 className="text-lg font-bold text-gray-800">Edit Volunteer Info</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* ACADEMIC */}
          <p className="text-xs font-semibold text-gray-400 uppercase">Academic</p>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">University Name</label>
            <input
              name="university_name"
              value={form.university_name}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Department</label>
            <input
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Academic Year</label>
            <input
              name="academic_year"
              value={form.academic_year}
              onChange={handleChange}
              placeholder="e.g. 2nd Year"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="border-t border-gray-100" />

          {/* LOCATION */}
          <p className="text-xs font-semibold text-gray-400 uppercase">Location</p>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">District</label>
            <input
              name="district"
              value={form.district}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Upazila</label>
            <input
              name="upazila"
              value={form.upazila}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={2}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="border-t border-gray-100" />

          {/* TEACHING */}
          <p className="text-xs font-semibold text-gray-400 uppercase">Teaching</p>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Teaching Mode</label>
            <select
              name="teaching_mode"
              value={form.teaching_mode}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="both">Both</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Experience</label>
            <textarea
              name="experience_text"
              value={form.experience_text}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>

        {/* FOOTER */}
        <div className="flex gap-3 px-6 pb-6">
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
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}