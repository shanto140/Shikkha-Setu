import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Inbox,
  BookOpen,
  GraduationCap,
  ArrowRight,
  Sparkles,
} from "lucide-react";

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
        const res = await fetch(
          "http://localhost:3000/api/volunteers/dashboard",
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (data.success) {
          setStats(data.data);
        }
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
      icon: Inbox,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-500/10",
      border: "hover:border-blue-500/50",
    },
    {
      label: "Scheduled Sessions",
      value: stats.scheduled_sessions || 0,
      icon: BookOpen,
      iconColor: "text-green-400",
      iconBg: "bg-green-500/10",
      border: "hover:border-green-500/50",
    },
    {
      label: "Completed Sessions",
      value: stats.completed_sessions || 0,
      icon: GraduationCap,
      iconColor: "text-purple-400",
      iconBg: "bg-purple-500/10",
      border: "hover:border-purple-500/50",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1e] px-6 py-8">
      <div className="max-w-6xl mx-auto space-y-6">

        <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-600/15 via-indigo-600/10 to-purple-600/15 p-8">
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 text-blue-400 mb-3">
              <Sparkles size={18} />
              <span className="text-2xl font-medium">
                Welcome back 👋
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold italic text-white leading-snug max-w-2xl">
              "Thank you for turning your free time into someone else's future."
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {statCards.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className={`
                  bg-[#111827]
                  border
                  border-gray-800
                  rounded-2xl
                  p-5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                  ${stat.border}
                `}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">
                      {stat.label}
                    </p>

                    <h2 className="text-4xl font-bold text-white mt-2">
                      {stat.value}
                    </h2>
                  </div>

                  <div
                    className={`
                      h-14 w-14
                      rounded-2xl
                      flex items-center justify-center
                      ${stat.iconBg}
                      ${stat.iconColor}
                    `}
                  >
                    <Icon size={28} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6">
          <h2 className="text-xl font-semibold text-white mb-5">
            Quick Actions
          </h2>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/volunteer/requests")}
              className="
                group
                flex items-center justify-center gap-2
                bg-blue-600
                hover:bg-blue-500
                text-white
                px-6 py-3
                rounded-xl
                transition-all
                duration-300
              "
            >
              View Requests

              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

            <button
              onClick={() => navigate("/volunteer/sessions")}
              className="
                group
                flex items-center justify-center gap-2
                bg-green-600
                hover:bg-green-500
                text-white
                px-6 py-3
                rounded-xl
                transition-all
                duration-300
              "
            >
              View Sessions

              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}