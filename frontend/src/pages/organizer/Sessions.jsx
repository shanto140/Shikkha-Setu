import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SessionCard from "../../components/organizer/SessionCard";

export default function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    hasNext: false,
    hasPrev: false,
    total: 0,
    totalPages: 1,
  });

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:3000/api/sessions?page=${page}&limit=10`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        },
      );
      const data = await res.json();
      setSessions(data.data.data || []);
      setPagination(data.data.pagination || {});
    } catch (err) {
      console.error("fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRateSuccess = (sessionId, star) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, rating: star } : s)),
    );
  };

  useEffect(() => {
    fetchSessions();
  }, [page]);

  const handleCancel = async (id) => {
    const res = await fetch(`http://localhost:3000/api/sessions/${id}/cancel`, {
      method: "PUT",
      credentials: "include",
    });
    const data = await res.json();
    if (data.success) {
      setSessions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: "cancelled" } : s)),
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-6 space-y-6">
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 animate-pulse"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded" />
                <div className="h-3 bg-gray-200 rounded w-5/6" />
              </div>
            </div>
          ))}
        </div>
      ) : sessions.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center text-gray-400 shadow-sm border border-gray-100">
          <div className="text-5xl mb-4">📚</div>
          <p className="font-semibold text-gray-600">No Sessions Found</p>
          <p className="text-sm mt-1 text-gray-500">
            Sessions will appear here once they are created.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sessions.map((s) => (
            <SessionCard
              key={s.id}
              session={s}
              onCancel={handleCancel}
              onRateSuccess={handleRateSuccess}
            />
          ))}
        </div>
      )}

      {sessions.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Page {pagination.page} of {pagination.totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={!pagination.hasPrev}
              onClick={() => setPage((p) => p - 1)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#190707] border border-gray-200 text-[#f8fafa]  text-sm disabled:opacity-40 hover:bg-[#57a574] transition"
            >
              <ChevronLeft size={15} /> Prev
            </button>
            <button
              disabled={!pagination.hasNext}
              onClick={() => setPage((p) => p + 1)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg  bg-[#190707] border border-gray-200 text-[#f8fafa]  text-sm disabled:opacity-40 hover:bg-[#57a574] transition"
            >
              Next <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
