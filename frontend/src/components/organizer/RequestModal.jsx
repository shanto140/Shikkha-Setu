import { useState } from "react";

export default function RequestModal({ volunteerId, classes, subjects, onClose }) {
  const [form, setForm] = useState({
    class_id: "",
    subject_id: "",
    mode: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.class_id || !form.subject_id || !form.mode) {
      alert("Please fill all required fields");
      return;
    }

    const payload = {
      volunteer_profile_id: volunteerId,
      class_id: Number(form.class_id),
      subject_id: Number(form.subject_id),
      mode: form.mode,
      description: form.description,
    };

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        alert("Request sent successfully 🚀");
        onClose();
      } else {
        alert(data.message || "Failed to send request");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-blue-600 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-white font-bold text-lg">Send Session Request</h2>
            <p className="text-blue-200 text-xs mt-0.5">Fill in the details below</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-blue-200 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4">

          {/* CLASS */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Class <span className="text-red-500">*</span>
            </label>
            <select
              value={form.class_id}
              onChange={(e) => setForm({ ...form, class_id: e.target.value })}
              className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Class</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* SUBJECT */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Subject <span className="text-red-500">*</span>
            </label>
            <select
              value={form.subject_id}
              onChange={(e) => setForm({ ...form, subject_id: e.target.value })}
              className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Subject</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* MODE */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Session Mode <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              {["online", "offline"].map((m) => (
                <button
                  key={m}
                  onClick={() => setForm({ ...form, mode: m })}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition ${
                    form.mode === m
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"
                  }`}
                >
                  {m === "online" ? "🌐 Online" : "📍 Offline"}
                </button>
              ))}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description
              <span className="text-gray-400 font-normal ml-1">(optional)</span>
            </label>
            <textarea
              rows={3}
              value={form.description}
              placeholder="Write any additional details..."
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border border-gray-200 rounded-lg p-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium transition"
            >
              {loading ? "Sending..." : "Send Request 🚀"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}