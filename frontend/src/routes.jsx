import { Routes, Route } from "react-router-dom";

import Home from "./pages/public/Home.jsx";
import Register from "./pages/auth/register/Register.jsx";
import Login from "./pages/auth/login.jsx";
import VolunteerLayout from "./pages/volunteer/Layout.jsx";
import VolunteerDashboard from "./pages/volunteer/Dashboard.jsx";
import Requests from "./pages/volunteer/Requests.jsx";
import Accepted from "./pages/volunteer/Accepted.jsx";
import VolunteerSessions from "./pages/volunteer/Sessions.jsx";

import OrganizerLayout from "./pages/organizer/Layout.jsx";
import OrganizerDashboard from "./pages/organizer/Dashboard.jsx";
import OrganizerRequests from "./pages/organizer/Requests.jsx";
import OrganizerSessions from "./pages/organizer/Sessions.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/volunteer" element={<VolunteerLayout />}>
        <Route index element={<VolunteerDashboard />} />
        <Route path="requests" element={<Requests />} />
        <Route path="accepted" element={<Accepted />} />
        <Route path="sessions" element={<VolunteerSessions />} />
      </Route>

      <Route path="/organizer" element={<OrganizerLayout />}>
        <Route index element={<OrganizerDashboard />} />
        <Route path="requests" element={<OrganizerRequests />} />
        <Route path="sessions" element={<OrganizerSessions />} />
      </Route>
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}
