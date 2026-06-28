import { useState } from "react";
import { X } from "lucide-react";

export default function SessionCreateModal({ request, onClose , onSessionCreated}) {
  const [form, setForm] = useState({
    session_date: "",
    start_time: "",
    end_time: "",
    meeting_link: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.session_date || !form.start_time || !form.end_time) {
      setError("Date, start time এবং end time দেওয়া আবশ্যক");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const payload = {
        request_id: request.id,
        organizer_profile_id: request.organizer_profile_id,
        volunteer_profile_id: request.volunteer_profile_id,
        subject_id: request.subject_id,
        class_id: request.class_id,
        mode: request.mode,
        session_title: `${request.subject} - ${request.class_name} Session`,
        session_date: form.session_date,
        start_time: form.start_time,
        end_time: form.end_time,
        meeting_link: form.meeting_link || null,
      };

      const res = await fetch("http://localhost:3000/api/sessions", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        onSessionCreated(request.id);
        onClose();
        alert('session created');
      } else {
        setError(data.message || "কিছু একটা সমস্যা হয়েছে");
      }
    } catch (err) {
      setError("Server এ সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Create Session</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {request.subject} — {request.class_name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Session Date
            </label>
            <input
              type="date"
              name="session_date"
              value={form.session_date}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">
                Start Time
              </label>
              <input
                type="time"
                name="start_time"
                value={form.start_time}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">
                End Time
              </label>
              <input
                type="time"
                name="end_time"
                value={form.end_time}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {request.mode === "online" && (
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">
                Meeting Link
              </label>
              <input
                type="url"
                name="meeting_link"
                value={form.meeting_link}
                onChange={handleChange}
                placeholder="https://meet.google.com/..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}
        </div>

        {/* FOOTER */}
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
            {loading ? "Creating..." : "Create Session"}
          </button>
        </div>
      </div>
    </div>
  );
}