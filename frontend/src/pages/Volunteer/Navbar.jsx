import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfileSidebar from "../../components/volunteer/profile/ProfileSidebar";
import {
  LogOut,
  LayoutDashboard,
  Inbox,
  CheckSquare,
  BookOpen,
  User,
} from "lucide-react";
import NotificationPanel from "../../components/shared/NotificationPanel";

export default function Navbar() {
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
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
        Volunteer Panel
      </div>

      <div className="flex gap-6 justify-center w-2/4">

        <NavLink to="/volunteer" end className={linkClass}>
          <LayoutDashboard size={15} /> Dashboard
        </NavLink>
        <NavLink to="/volunteer/requests" className={linkClass}>
          <Inbox size={15} /> Incomming Requests
        </NavLink>
        <NavLink to="/volunteer/accepted" className={linkClass}>
          <CheckSquare size={15} /> Accepted Requests
        </NavLink>
        <NavLink to="/volunteer/sessions" className={linkClass}>
          <BookOpen size={15} /> Sessions
        </NavLink>
      </div>

      <div className="flex items-center gap-3 justify-end w-1/4">
        <NotificationPanel role="volunteer" />
        {/* 
        <NavLink
          to="/volunteer/profile"
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
          onClick={handleLogout}
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
