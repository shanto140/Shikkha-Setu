import { useState } from "react";
import { X, Trash2, Plus, Pencil, Check } from "lucide-react";
import { formatTime,formatDate} from "../../../../utils/timeFormat";

const DAYS = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

export default function AvailabilityModal({ profile, onClose, onSuccess }) {
  const [slots, setSlots] = useState(profile?.availability || []);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [newSlot, setNewSlot] = useState({
    day_of_week: "",
    start_time: "",
    end_time: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/volunteers/availability/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      const data = await res.json();
      if (data.success) {
        setSlots((prev) => prev.filter((s) => s.id !== id));
        onSuccess();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditStart = (slot) => {
    setEditingId(slot.id);
    setEditForm({
      day_of_week: slot.day_of_week,
      start_time: slot.start_time,
      end_time: slot.end_time,
    });
  };

  const handleEditSave = async (id) => {
    if (editForm.start_time >= editForm.end_time) {
      return setError("End time must be after start time");
    }
    try {
      setLoading(true);
      setError("");
      const res = await fetch(
        `http://localhost:3000/api/volunteers/availability/${id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editForm),
        },
      );
      const data = await res.json();
      if (data.success) {
        setSlots((prev) =>
          prev.map((s) => (s.id === id ? { ...s, ...editForm } : s)),
        );
        setEditingId(null);
        onSuccess();
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!newSlot.day_of_week) return setError("Select a day");
    if (!newSlot.start_time || !newSlot.end_time)
      return setError("Start and end time required");
    if (newSlot.start_time >= newSlot.end_time)
      return setError("End time must be after start time");

    try {
      setLoading(true);
      setError("");
      const res = await fetch(
        "http://localhost:3000/api/volunteers/availability",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newSlot),
        },
      );
      const data = await res.json();
      if (data.success) {
        setSlots((prev) => [...prev, { id: data.data?.insertId, ...newSlot }]);
        setNewSlot({ day_of_week: "", start_time: "", end_time: "" });
        onSuccess();
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
          <h2 className="text-lg font-bold text-gray-800">
            Manage Availability
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-3">
         
          {slots.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">
              No availability added yet
            </p>
          ) : (
            slots.map((slot) => (
              <div key={slot.id} className="bg-gray-50 rounded-lg px-3 py-2">
                {editingId === slot.id ? (
                  
                  <div className="space-y-2">
                    <select
                      value={editForm.day_of_week}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          day_of_week: e.target.value,
                        })
                      }
                      className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-[#4b4949] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {DAYS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                    <div className="flex gap-2">
                      <input
                        type="time"
                        value={editForm.start_time}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            start_time: e.target.value,
                          })
                        }
                        className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-[#4b4949] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="time"
                        value={editForm.end_time}
                        onChange={(e) =>
                          setEditForm({ ...editForm, end_time: e.target.value })
                        }
                        className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-[#4b4949] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex-1 py-1.5 border border-gray-200 text-gray-600 text-xs rounded-lg hover:bg-gray-100 transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleEditSave(slot.id)}
                        disabled={loading}
                        className="flex-1 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                      >
                        <Check size={12} className="inline mr-1" /> Save
                      </button>
                    </div>
                  </div>
                ) : (
                 
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {slot.day_of_week}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatTime(slot.start_time)} -{" "}
                        {formatTime(slot.end_time)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditStart(slot)}
                        className="text-gray-300 hover:text-blue-400 transition"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(slot.id)}
                        className="text-gray-300 hover:text-red-400 transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}

          {error && <p className="text-xs text-red-500">{error}</p>}

          <div className="border-t border-gray-100" />

         
          <p className="text-xs font-semibold text-gray-400 uppercase">
            Add New Slot
          </p>
          <select
            value={newSlot.day_of_week}
            onChange={(e) => {
              setNewSlot({ ...newSlot, day_of_week: e.target.value });
              setError("");
            }}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[#4b4949] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select day</option>
            {DAYS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">
                Start Time
              </label>
              <input
                type="time"
                value={newSlot.start_time}
                onChange={(e) =>
                  setNewSlot({ ...newSlot, start_time: e.target.value })
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[#4b4949] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">
                End Time
              </label>
              <input
                type="time"
                value={newSlot.end_time}
                onChange={(e) =>
                  setNewSlot({ ...newSlot, end_time: e.target.value })
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[#4b4949] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            onClick={handleAdd}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition disabled:opacity-50"
          >
            <Plus size={14} /> Add Slot
          </button>
        </div>

      
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full py-2 border border-gray-200 text-gray-600 text-sm rounded-lg hover:bg-gray-50 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
