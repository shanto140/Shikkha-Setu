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

export default function AcceptedCard({ request, onSessionCreated }) {
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
      <div className="bg-[#2a3950] border border-[#3e5170] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.4)] border-l-4 border-l-green-500 p-5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 hover:border-green-400/40 transition-all duration-200">
        {/* TOP */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white font-bold flex items-center justify-center text-sm flex-shrink-0 shadow-md">
            {getInitials(institution_name)}
          </div>
          <div>
            <p className="font-semibold text-gray-100 text-sm">
              {institution_name}
            </p>
            <p className="text-xs text-gray-400">{organizer_name}</p>
          </div>
          <span className="ml-auto text-xs px-2 py-1 rounded-full border font-medium bg-green-500/10 text-green-400 border-green-500/30">
            Accepted
          </span>
        </div>

        {/* MIDDLE */}
        <div className="flex flex-wrap gap-2 mb-4">
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

        {/* DIVIDER */}
        <div className="border-t border-[#3e5170] mb-3" />

        {/* CONTACT INFO */}
        <p className="text-xs font-semibold text-gray-400 mb-2">
          Organizer Contact
        </p>
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <Phone size={12} className="text-green-400" />
            {organizer_phone}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <Mail size={12} className="text-blue-400" />
            {organizer_email}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <MapPin size={12} className="text-amber-400" />
            {district}
            {upazila ? `, ${upazila}` : ""}
          </div>
        </div>

        {/* CREATE SESSION BUTTON */}
        <button
          onClick={() => setShowModal(true)}
          className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition font-medium shadow-md"
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