import { Wifi, WifiOff } from "lucide-react";
import { useState, useEffect } from "react";
import {
  X,
  User,
  BookOpen,
  GraduationCap,
  Calendar,
  Lock,
  ChevronRight,
  Eye,
} from "lucide-react";
import ProfileDetailsModal from "./modals/ProfileDetailsModal";
import GeneralInfoModal from "./modals/GeneralInfoModal";
import VolunteerInfoModal from "./modals/VolunteerInfoModal";
import SubjectsModal from "./modals/SubjectModal";
import ClassesModal from "./modals/ClassesModal";
import AvailabilityModal from "./modals/AvailabilityModal";
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
  const [isAvailable, setIsAvailable] = useState(false);


  const handleToggle = async () => {
    const newStatus = !isAvailable;
    try {
      const res = await fetch(
        `http://localhost:3000/api/volunteers/toggleActiveStatus?status=${newStatus}`,
        { method: "PUT", credentials: "include" }
      );
      const data = await res.json();
      if (data.success) setIsAvailable(newStatus);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/volunteers/my-profile/full",
        {
          credentials: "include",
        },
      );
      const data = await res.json();
      console.log(data.data);
      if (data.success) {
        setProfile(data.data);
        setIsAvailable(data.data.open_to_volunteer);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (open) fetchProfile();
  }, [open]);

  const menuItems = [
    { key: "details", icon: <Eye size={16} />, label: "View Profile Details" },
    { key: "general", icon: <User size={16} />, label: "Edit General Info" },
    {
      key: "volunteer",
      icon: <GraduationCap size={16} />,
      label: "Edit Volunteer Info",
    },
    { key: "subjects", icon: <BookOpen size={16} />, label: "Manage Subjects" },
    {
      key: "classes",
      icon: <GraduationCap size={16} />,
      label: "Manage Classes",
    },
    {
      key: "availability",
      icon: <Calendar size={16} />,
      label: "Manage Availability",
    },
    { key: "password", icon: <Lock size={16} />, label: "Change Password" },
  ];

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />
      )}

      <div
        className={`fixed top-0 right-0 w-72 h-full  bg-[#252937] backdrop-blurshadow-xl rounded-l-2xl border-l
         border-[#46584f] flex flex-col overflow-hidden
          transform transition-transform duration-300 ease-in-out z-50
          ${open ? "translate-x-0" : "translate-x-full -translate-y-full"}`}
      >


        <div className="flex items-center justify-between px-5 py-4 border-b border-[#254652] flex-shrink-0">
          <h2 className="font-semibold text-[#1e0ca9] text-sm">My Profile</h2>
          <button
            onClick={onClose}
            className="text-[#d1d5d6] hover:text-[#5e6c83] transition"
          >
            <X size={18} />
          </button>
        </div>

        {profile && (
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[#254652]">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-sm flex-shrink-0">
              {getInitials(profile.full_name)}
            </div>
            <div>
              <p className="font-semibold text-[#f1f5ef] text-sm">
                {profile.full_name}
              </p>
              <p className="text-xs text-[#f1f5ef]">{profile.email}</p>
            </div>
          </div>
        )}

        {profile && (
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#254652]">

            <div className="flex items-center gap-2 text-sm text-[#f1f5ef]">
              {isAvailable ? (
                <Wifi size={15} className="text-green-500" />
              ) : (
                <WifiOff size={15} className="text-gray-400" />
              )}
              <span className={isAvailable ? "text-green-600 font-medium" : "text-gray-400"}>
                {isAvailable ? "Available" : "Unavailable"}
              </span>
            </div>

            <button
              onClick={handleToggle}
              className={`relative inline-flex w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${isAvailable ? "bg-green-500" : "bg-gray-300"
                }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${isAvailable ? "translate-x-6" : "translate-x-1"
                  }`}
              />

            </button>

          </div>
        )}

        <div className="py-2">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveModal(item.key)}
              className="w-full flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition text-left group"
            >
              <div className="flex items-center gap-3 text-sm text-[#f1f5ef] group-hover:text-[#333131]">
                <span className="text-[#f1f5ef] group-hover:text-blue-500 transition">{item.icon}</span>
                {item.label}
              </div>
              <ChevronRight size={15} className="text-gray-300 group-hover:text-gray-400" />
            </button>
          ))}
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
      {activeModal === "volunteer" && (
        <VolunteerInfoModal
          profile={profile}
          onClose={() => setActiveModal(null)}
          onSuccess={fetchProfile}
        />
      )}
      {activeModal === "subjects" && (
        <SubjectsModal
          profile={profile}
          onClose={() => setActiveModal(null)}
          onSuccess={fetchProfile}
        />
      )}
      {activeModal === "classes" && (
        <ClassesModal
          profile={profile}
          onClose={() => setActiveModal(null)}
          onSuccess={fetchProfile}
        />
      )}
      {activeModal === "availability" && (
        <AvailabilityModal
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
