import { Clock, X, Phone, Mail } from "lucide-react";
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

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
  accepted: "bg-green-100 text-green-700 border-green-300",
  rejected: "bg-red-100 text-red-700 border-red-300",
  expired: "bg-gray-100 text-gray-500 border-gray-300",
};

const borderColors = {
  pending: "border-l-yellow-400",
  accepted: "border-l-green-400",
  rejected: "border-l-red-400",
  expired: "border-l-gray-300",
};

export default function RequestCard({ request, onCancel }) {
  const {
    id,
    volunteer_name,
    university_name,
    volunteer_phone,
    volunteer_email,
    subject,
    class_name,
    mode,
    status,
    expires_at,
  } = request;

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 ${borderColors[status]} p-5 hover:shadow-md transition`}
    >
      {/* TOP */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-sm flex-shrink-0">
          {getInitials(volunteer_name)}
        </div>
        <div>
          <p className="font-semibold text-gray-800 text-sm">
            {volunteer_name}
          </p>
          <p className="text-xs text-gray-500">{university_name}</p>
        </div>
        <span
          className={`ml-auto text-xs px-2 py-1 rounded-full border font-medium ${statusStyles[status]}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      {/* MIDDLE */}
      <div className="flex flex-wrap gap-2 mb-4">
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

      {status === "accepted" && (
        <>
          <div className="border-t border-gray-100 mb-3 mt-1" />
          <p className="text-xs font-semibold text-gray-500 mb-2">
            Volunteer Contact
          </p>
          <div className="space-y-1.5 mb-3">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Phone size={12} className="text-gray-400" /> {volunteer_phone}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Mail size={12} className="text-gray-400" /> {volunteer_email}
            </div>
          </div>
        </>
      )}

      {/* BOTTOM */}
      <div className="flex items-center justify-between">
        {status === "pending" && (
          <>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock size={13} />
              <span>Expires in:</span>
              <CountdownTimer expiresAt={expires_at} />
            </div>
            <button
              onClick={() => onCancel(id)}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition"
            >
              <X size={13} /> Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
