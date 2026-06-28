import { useState, useEffect } from "react";
import { X, User, Building2, Lock, ChevronRight, Eye } from "lucide-react";
import ProfileDetailsModal from "./modals/ProfileDetailsModal";
import GeneralInfoModal from "./modals/GeneralInfoModal";
import OrganizerInfoModal from "./modals/OrganizerInfoModal";
import PasswordModal from "./modals/PasswordModal";

function getInitials(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function ProfileSidebar({ open, onClose }) {
  const [profile, setProfile] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/organizers/profile", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) setProfile(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (open) fetchProfile();
  }, [open]);

  const menuItems = [
    { key: "details", icon: <Eye size={15} />, label: "View Profile Details" },
    { key: "general", icon: <User size={15} />, label: "Edit General Info" },
    {
      key: "organizer",
      icon: <Building2 size={15} />,
      label: "Edit Organizer Info",
    },
    { key: "password", icon: <Lock size={15} />, label: "Change Password" },
  ];

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      )}

      <div
        className={`fixed top-0 right-0 w-72 h-full bg-white/95 backdrop-blurshadow-xl rounded-l-2xl border-l
         border-gray-100 flex flex-col overflow-hidden
          transform transition-transform duration-300 ease-in-out z-50
          ${open ? "translate-x-0" : "translate-x-full -translate-y-full"}`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="font-semibold text-gray-800 text-sm">My Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={18} />
          </button>
        </div>

        {profile ? (
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 flex-shrink-0">
            <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-sm flex-shrink-0">
              {getInitials(profile.full_name)}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-gray-800 text-sm truncate">
                {profile.full_name}
              </p>
              <p className="text-xs text-gray-500 truncate">{profile.email}</p>
              <p className="text-xs text-blue-500 mt-0.5 truncate">
                {profile.institution_name}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
            <div className="w-11 h-11 rounded-full bg-gray-200 animate-pulse flex-shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto py-2">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveModal(item.key)}
              className="w-full flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition text-left group"
            >
              <div className="flex items-center gap-3 text-sm text-gray-600 group-hover:text-gray-800">
                <span className="text-gray-400 group-hover:text-blue-500 transition">
                  {item.icon}
                </span>
                {item.label}
              </div>
              <ChevronRight
                size={14}
                className="text-gray-300 group-hover:text-gray-400"
              />
            </button>
          ))}
        </div>

        <div className="px-5 py-4 border-t border-gray-100 flex-shrink-0">
          <p className="text-xs text-gray-400 text-center">
            Shikkha Setu Platform
          </p>
        </div>
      </div>

      {activeModal === "details" && (
        <ProfileDetailsModal
          profile={profile}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === "general" && (
        <GeneralInfoModal
          profile={profile}
          onClose={() => setActiveModal(null)}
          onSuccess={fetchProfile}
        />
      )}
      {activeModal === "organizer" && (
        <OrganizerInfoModal
          profile={profile}
          onClose={() => setActiveModal(null)}
          onSuccess={fetchProfile}
        />
      )}
      {activeModal === "password" && (
        <PasswordModal onClose={() => setActiveModal(null)} />
      )}
    </>
  );
}
