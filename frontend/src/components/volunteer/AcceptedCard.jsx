import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import SessionCreateModal from "./SessionCreateModal";

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function AcceptedCard({ request , onSessionCreated}) {
  const [showModal, setShowModal] = useState(false);

  const {
    organizer_name,
    institution_name,
    district,
    upazila,
    organizer_phone,
    organizer_email,
    subject,
    class_name,
    mode,
  } = request;

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-green-400 p-5 hover:shadow-md transition">
        {/* TOP */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 font-bold flex items-center justify-center text-sm flex-shrink-0">
            {getInitials(institution_name)}
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-sm">
              {institution_name}
            </p>
            <p className="text-xs text-gray-500">{organizer_name}</p>
          </div>
          <span className="ml-auto text-xs px-2 py-1 rounded-full border font-medium bg-green-100 text-green-700 border-green-300">
            Accepted
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

        {/* DIVIDER */}
        <div className="border-t border-gray-100 mb-3" />

        {/* CONTACT INFO */}
        <p className="text-xs font-semibold text-gray-500 mb-2">
          Organizer Contact
        </p>
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Phone size={12} className="text-gray-400" />
            {organizer_phone}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Mail size={12} className="text-gray-400" />
            {organizer_email}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <MapPin size={12} className="text-gray-400" />
            {district}
            {upazila ? `, ${upazila}` : ""}
          </div>
        </div>

        {/* CREATE SESSION BUTTON */}
        <button
          onClick={() => setShowModal(true)}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition font-medium"
        >
          + Create Session
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <SessionCreateModal
          request={request}
          onClose={() => setShowModal(false)}
          onSessionCreated={onSessionCreated}
        />
      )}
    </>
  );
}
