
import { useState, useEffect } from "react";
import { X, Trash2, Plus } from "lucide-react";

export default function ClassesModal({ profile, onClose, onSuccess }) {
  const [classes, setClasses] = useState(profile?.classes || []);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [allClasses, setAllClasses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/public/classes")
      .then((r) => r.json())
      .then((d) => setAllClasses(d.data || []));
  }, []);

  const handleAdd = async () => {
    if (!selected) return setError("Select a class");
    const already = classes.find((c) => c.name === selected);
    if (already) return setError("Class already added");

    try {
      setLoading(true);
      setError("");
      const res = await fetch("http://localhost:3000/api/volunteers/classes", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ class_names: [selected] }),
      });
      const data = await res.json();
      if (data.success) {
        setClasses((prev) => [...prev, { id: null, name: selected }]);
        setSelected("");
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

  const handleDelete = async (classId) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/volunteers/classes/${classId}`,
        { method: "DELETE", credentials: "include" },
      );
      const data = await res.json();
      if (data.success) {
        setClasses((prev) => prev.filter((c) => c.id !== classId));
        onSuccess();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-800">Manage Classes</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-2 mb-4">
          {classes.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">
              No classes added yet
            </p>
          ) : (
            classes.map((c) => (
              <div
                key={c.id || c.name}
                className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg"
              >
                <span className="text-sm text-gray-700">{c.name}</span>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="text-gray-300 hover:text-red-400 transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-gray-100 mb-4" />

        <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
          Add Class
        </p>
        <div className="flex gap-2">
          <select
            value={selected}
            onChange={(e) => {
              setSelected(e.target.value);
              setError("");
            }}
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select class</option>
            {allClasses
              .filter((c) => !classes.find((ex) => ex.name === c))
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
          <button
            onClick={handleAdd}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition disabled:opacity-50"
          >
            <Plus size={14} /> Add
          </button>
        </div>

        {error && <p className="text-xs text-red-500 mt-2">{error}</p>}

        <div className="mt-5">
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
