import { Phone, Mail, MapPin, Calendar, Clock, Link } from "lucide-react";
import { formatTime, formatDate } from "../../utils/timeFormat";
import StarRating from "../shared/StarRating";

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const statusStyles = {
  scheduled: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  completed: "bg-green-500/10 text-green-400 border-green-500/30",
  cancelled: "bg-gray-500/10 text-gray-400 border-gray-500/30",
};

const borderColors = {                                      
  scheduled: "border-l-blue-500",
  completed: "border-l-green-500",
  cancelled: "border-l-gray-500",
};

export default function SessionCard({ session, onComplete, onCancel }) {
  const {
    id,
    session_title,
    session_date,
    start_time,
    end_time,
    mode,
    meeting_link,
    status,
    organizer_name,
    organizer_phone,
    organizer_email,
    institution_name,
    district,
  } = session;

  return (
    <div
      className={`bg-[#2a3950] border border-[#3e5170] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.4)] border-l-4 ${borderColors[status]} p-5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 hover:border-blue-400/40 transition-all duration-200`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold flex items-center justify-center text-sm flex-shrink-0 shadow-md">
          {getInitials(institution_name)}
        </div>
        <div>
          <p className="font-semibold text-gray-100 text-sm">
            {institution_name}
          </p>
          <p className="text-xs text-gray-400">{organizer_name}</p>
        </div>
        <span
          className={`ml-auto text-xs px-2 py-1 rounded-full border font-medium ${statusStyles[status]}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      
      <p className="text-sm font-medium text-gray-200 mb-3">{session_title}</p>

      
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 text-xs px-3 py-1 rounded-full flex items-center gap-1">
          <Calendar size={11} /> {formatDate(session_date)}
        </span>
        <span className="bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs px-3 py-1 rounded-full flex items-center gap-1">
          <Clock size={11} /> {formatTime(start_time)} - {formatTime(end_time)}
        </span>
        <span
          className={`text-xs px-3 py-1 rounded-full border font-medium ${
            mode === "online"
              ? "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"
              : "bg-orange-500/15 text-orange-300 border-orange-500/30"
          }`}
        >
          {mode === "online" ? "🌐 Online" : "📍 Offline"}
        </span>
      </div>

      {mode === "online" && meeting_link && (
        <a
          href={meeting_link}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 hover:underline mb-4"
        >
          <Link size={12} /> Join Meeting
        </a>
      )}

      <div className="border-t border-[#3e5170] mb-3" />

      <p className="text-xs font-semibold text-gray-400 mb-2">
        Organizer Contact
      </p>
      <div className="space-y-1.5 mb-4">
        <div className="flex items-center gap-2 text-xs text-gray-300">
          <Phone size={12} className="text-green-400" /> {organizer_phone}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-300">
          <Mail size={12} className="text-blue-400" /> {organizer_email}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-300">
          <MapPin size={12} className="text-amber-400" /> {district}
        </div>
      </div>

      {status === "scheduled" && (
        <div className="flex gap-2">
          <button
            onClick={() => onCancel(id)}
            className="flex-1 py-2 border border-red-500/30 text-red-400 bg-red-500/10 text-sm rounded-lg hover:bg-red-500/20 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onComplete(id)}
            className="flex-1 py-2 bg-green-600 hover:bg-green-500 text-white text-sm rounded-lg transition shadow-md"
          >
            Complete
          </button>
        </div>
      )}

      {status === "completed" && (
        <div className="mb-3">
          <p className="text-xs text-gray-400 mb-1">Rating</p>
          {session.rating ? (
            <span className="inline-flex items-center gap-1 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-2 py-0.5 rounded-full text-xs font-medium">
              <StarRating rating={session.rating} />
            </span>
          ) : (
            <span className="text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full font-medium">
              No review yet
            </span>
          )}
        </div>
      )}
    </div>
  );
}