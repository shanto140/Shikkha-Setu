import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Inbox, BookOpen, GraduationCap, ArrowRight } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    pending_requests: 0,
    scheduled_sessions: 0,
    completed_sessions: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/volunteers/dashboard", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) setStats(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Pending Requests",
      value: stats.pending_requests || 0,
      icon: <Inbox size={22} />,
      bg: "bg-blue-500",
    },
    {
      label: "Scheduled Sessions",
      value: stats.scheduled_sessions || 0,
      icon: <BookOpen size={22} />,
      bg: "bg-green-500",
    },
    {
      label: "Completed Sessions",
      value: stats.completed_sessions || 0,
      icon: <GraduationCap size={22} />,
      bg: "bg-purple-500",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-6 space-y-6">
    
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h1 className="text-2xl font-bold text-gray-800">Volunteer Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage requests, sessions, and teaching activities
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className={`${stat.bg} text-white p-5 rounded-xl shadow-sm flex items-center justify-between`}
          >
            <div>
              <p className="text-sm opacity-80">{stat.label}</p>
              <p className="text-3xl font-bold mt-1">{stat.value}</p>
            </div>
            <div className="opacity-80">{stat.icon}</div>
          </div>
        ))}
      </div>

      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-700 mb-3">Quick Actions</h2>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/volunteer/requests")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition"
          >
            View Requests <ArrowRight size={14} />
          </button>
          <button
            onClick={() => navigate("/volunteer/sessions")}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition"
          >
            View Sessions <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}