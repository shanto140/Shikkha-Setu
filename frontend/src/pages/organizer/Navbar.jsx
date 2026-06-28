import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Inbox,
  CalendarDays,
  User,
  LogOut,
} from "lucide-react";
import ProfileSidebar from "../../components/organizer/profile/ProfileSidebar";
import NotificationPanel from "../../components/shared/NotificationPanel";

export default function Navbar() {
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-1.5 text-sm font-medium pb-1 transition ${
      isActive
        ? "text-blue-600 border-b-2 border-blue-600"
        : "text-gray-500 hover:text-gray-800"
    }`;

  return (
    <nav className="bg-white shadow-sm px-16 py-3 flex items-center sticky top-0 z-50">
      <div className="font-bold text-lg text-blue-600 w-1/4">
        Organizer Panel
      </div>

      <div className="flex gap-6 justify-center w-2/4">
        <NavLink to="/organizer" end className={linkClass}>
          <LayoutDashboard size={15} /> Dashboard
        </NavLink>

        <NavLink to="/organizer/requests" className={linkClass}>
          <Inbox size={15} /> Requests
        </NavLink>

        <NavLink to="/organizer/sessions" className={linkClass}>
          <CalendarDays size={15} /> Sessions
        </NavLink>
      </div>

      <div className="flex items-center gap-3 justify-end w-1/4">
        <NotificationPanel role="organizer" />
        {/* <NavLink
          to=" "
          className={({ isActive }) =>
            `flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border transition ${
              isActive
                ? "bg-blue-600 text-white border-blue-600"
                : "text-gray-600 border-gray-200 hover:bg-gray-50"
            }`
          }
        >
          <User size={14} /> Profile
        </NavLink> */}

        <button
          onClick={() => setProfileOpen(true)}
          className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border transition text-gray-600 border-gray-200 hover:bg-gray-50"
        >
          <User size={14} /> Profile
        </button>

        <button
          onClick={logout}
          className="flex items-center gap-1.5 text-sm px-3 py-1.5 border border-gray-200 rounded-lg text-red-500 hover:bg-red-50 transition"
        >
          <LogOut size={14} /> Logout
        </button>

        <ProfileSidebar
          open={profileOpen}
          onClose={() => setProfileOpen(false)}
        />
        
      </div>
    </nav>
  );
}
