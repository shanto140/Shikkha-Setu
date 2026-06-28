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
  scheduled: "bg-blue-100 text-blue-700 border-blue-300",
  completed: "bg-green-100 text-green-700 border-green-300",
  cancelled: "bg-gray-100 text-gray-500 border-gray-300",
};

const borderColors = {
  scheduled: "border-l-blue-400",
  completed: "border-l-green-400",
  cancelled: "border-l-gray-300",
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
      className={`bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 ${borderColors[status]} p-5 hover:shadow-md transition`}
    >
      {/* TOP */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-sm flex-shrink-0">
          {getInitials(institution_name)}
        </div>
        <div>
          <p className="font-semibold text-gray-800 text-sm">
            {institution_name}
          </p>
          <p className="text-xs text-gray-500">{organizer_name}</p>
        </div>
        <span
          className={`ml-auto text-xs px-2 py-1 rounded-full border font-medium ${statusStyles[status]}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      {/* SESSION TITLE */}
      <p className="text-sm font-medium text-gray-700 mb-3">{session_title}</p>

      {/* DATE TIME MODE */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full flex items-center gap-1">
          <Calendar size={11} /> {formatDate(session_date)}
        </span>
        <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full flex items-center gap-1">
          <Clock size={11} /> {formatTime(start_time)} - {formatTime(end_time)}
        </span>
        <span
          className={`text-xs px-3 py-1 rounded-full ${mode === "online"
              ? "bg-blue-100 text-blue-600"
              : "bg-gray-200 text-gray-600"
            }`}
        >
          {mode === "online" ? "🌐 Online" : "📍 Offline"}
        </span>
      </div>

      {/* MEETING LINK */}
      {mode === "online" && meeting_link && (
        <a
          href={meeting_link}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-xs text-blue-600 hover:underline mb-4"
        >
          <Link size={12} /> Join Meeting
        </a>
      )}

      {/* DIVIDER */}
      <div className="border-t border-gray-100 mb-3" />

      {/* CONTACT */}
      <p className="text-xs font-semibold text-gray-500 mb-2">
        Organizer Contact
      </p>
      <div className="space-y-1.5 mb-4">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Phone size={12} className="text-gray-400" /> {organizer_phone}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Mail size={12} className="text-gray-400" /> {organizer_email}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <MapPin size={12} className="text-gray-400" /> {district}
        </div>
      </div>

      {/* BUTTONS */}
      {status === "scheduled" && (
        <div className="flex gap-2">
          <button
            onClick={() => onCancel(id)}
            className="flex-1 py-2 border border-red-200 text-red-500 text-sm rounded-lg hover:bg-red-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onComplete(id)}
            className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition"
          >
            Complete
          </button>
        </div>
      )}

      {status === "completed" && (
        <div className="mb-3">
          <p className="text-xs text-gray-400 mb-1">Rating</p>
          {session.rating ? (
            <span className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full text-xs font-medium">
              <StarRating rating={session.rating} />
            </span>
          ) : (
            <span className="text-xs text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full font-medium">
              No review yet
            </span>
          )}
        </div>
      )}
    </div>
  );
}
