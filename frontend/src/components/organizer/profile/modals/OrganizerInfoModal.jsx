import { useState } from "react";
import { X } from "lucide-react";

export default function OrganizerInfoModal({ profile, onClose, onSuccess }) {
  const [form, setForm] = useState({
    institution_name: profile?.institution_name || "",
    institution_type: profile?.institution_type || "",
    description: profile?.description || "",
    district: profile?.district || "",
    upazila: profile?.upazila || "",
    website_url: profile?.website_url || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.institution_name.trim()) return setError("Institution name is required");
    if (!form.district.trim()) return setError("District is required");

    try {
      setLoading(true);
      setError("");
      const res = await fetch("http://localhost:3000/api/organizers/profile", {
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
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white">
          <h2 className="text-lg font-bold text-gray-800">Edit Organizer Info</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Institution Name</label>
            <input
              name="institution_name"
              value={form.institution_name}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[#4b4949] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Institution Type</label>
            <input
              name="institution_type"
              value={form.institution_type}
              onChange={handleChange}
              placeholder="e.g. School, NGO, College"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[#4b4949] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[#4b4949] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="border-t border-gray-100" />

          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">District</label>
            <input
              name="district"
              value={form.district}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[#4b4949] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Upazila</label>
            <input
              name="upazila"
              value={form.upazila}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[#4b4949] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="border-t border-gray-100" />

          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Website URL</label>
            <input
              name="website_url"
              value={form.website_url}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[#4b4949] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>

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