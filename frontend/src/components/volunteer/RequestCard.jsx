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

  if (diff <= 0) return <span className="text-red-400 text-xs">Expired</span>;
  const hours = Math.floor(diff / 1000 / 60 / 60);
  const mins = Math.floor((diff / 1000 / 60) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  return (
    <span className="text-xs text-gray-400">
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
    <div className="bg-[#2a3950] border border-[#3e5170] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.4)] border-l-4 border-l-blue-500 p-5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 hover:border-blue-400/40 transition-all duration-200">
      {/* TOP */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-white font-bold flex items-center justify-center text-sm flex-shrink-0 shadow-md">
          {getInitials(institution_name)}
        </div>
        <div>
          <p className="font-semibold text-gray-100 text-sm">
            {institution_name}
          </p>
          <p className="text-xs text-gray-400">{district}</p>
        </div>
      </div>

      {/* MIDDLE */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs px-3 py-1 rounded-full">
          📚 Subject: {subject}
        </span>
        <span className="bg-pink-500/15 text-pink-300 border border-pink-500/30 text-xs px-3 py-1 rounded-full">
          🎓 Class: {class_name}
        </span>
        <span
          className={`text-xs px-3 py-1 rounded-full border font-medium ${
            mode === "online"
              ? "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"
              : "bg-orange-500/15 text-orange-300 border-orange-500/30"
          }`}
        >
          {mode === "online" ? "🌐 Mode: Online" : "📍 Mode: Offline"}
        </span>
      </div>

      {/* DESCRIPTION */}
      {description && (
        <div className="mb-3 bg-[#0f172a]/50 border border-[#3e5170] rounded-lg p-2.5">
          <p className="text-xs font-semibold text-gray-400 mb-1">
            Description
          </p>
          <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
      )}

      {/* BOTTOM */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Clock size={13} className="text-amber-400" />
          <span>Expires in:</span>
          <CountdownTimer expiresAt={expires_at} />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onReject(id)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-red-500/30 text-red-400 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition"
          >
            <X size={13} /> Reject
          </button>
          <button
            onClick={() => onAccept(id)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded-lg transition shadow-md"
          >
            <Check size={13} /> Accept
          </button>
        </div>
      </div>
    </div>
  );
}