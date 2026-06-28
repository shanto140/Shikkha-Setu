import { Clock, Check, X } from "lucide-react";
import { useState, useEffect } from "react";

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function CountdownTimer({ expiresAt }) {
  const [diff, setDiff] = useState(new Date(expiresAt) - new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDiff(new Date(expiresAt) - new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  if (diff <= 0) return <span className="text-red-500 text-xs">Expired</span>;
  const hours = Math.floor(diff / 1000 / 60 / 60);
  const mins = Math.floor((diff / 1000 / 60) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  return (
    <span className="text-xs text-gray-500">
      {hours}h {mins}m {secs}s বাকি
    </span>
  );
}

export default function RequestCard({ request, onAccept, onReject }) {
  const {
    id,
    organizer_name,
    institution_name,
    district,
    subject,
    class_name,
    mode,
    description,
    expires_at,
  } = request;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-blue-400 p-5 hover:shadow-md transition">
      {/* TOP */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 font-bold flex items-center justify-center text-sm flex-shrink-0">
          {getInitials(institution_name)}
        </div>
        <div>
          <p className="font-semibold text-gray-800 text-sm">
            {institution_name}
          </p>
          <p className="text-xs text-gray-500">{district}</p>
        </div>
      </div>

      {/* MIDDLE */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
          📚 Subject: {subject}
        </span>
        <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
          🎓 Class: {class_name}
        </span>
        <span
          className={`text-xs px-3 py-1 rounded-full ${
            mode === "online"
              ? "bg-blue-100 text-blue-600"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {mode === "online" ? "🌐 Mode: Online" : "📍 Mode: Offline"}
        </span>
      </div>

      {/* DESCRIPTION */}
      {description && (
        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-500 mb-1">
            Description
          </p>
          <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
      )}

      {/* BOTTOM */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock size={13} />
          <span>Expires in:</span>
          <CountdownTimer expiresAt={expires_at} />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onReject(id)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition"
          >
            <X size={13} /> Reject
          </button>
          <button
            onClick={() => onAccept(id)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            <Check size={13} /> Accept
          </button>
        </div>
      </div>
    </div>
  );
}
