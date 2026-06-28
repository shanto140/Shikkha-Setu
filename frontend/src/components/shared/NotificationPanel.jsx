import { useState, useEffect, useRef } from "react";
import { Bell, Trash2, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

function timeAgo(dateStr) {
  const diff = new Date() - new Date(dateStr);
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  if (hours < 24) return `${hours} hour ago`;
  return `${days} day ago`;
}

export default function NotificationPanel({ role }) {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unseenCount, setUnseenCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const panelRef = useRef(null);
  const navigate = useNavigate();

  const fetchUnseenCount = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/notifications/unseen-count",
        { credentials: "include" },
      );
      const data = await res.json();
      setUnseenCount(data.data.count || 0);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/notifications", {
        credentials: "include",
      });
      const data = await res.json();
      setNotifications(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const markAllSeen = async () => {
    try {
      await fetch("http://localhost:3000/api/notifications/seen-all", {
        method: "PATCH",
        credentials: "include",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    await fetch(`http://localhost:3000/api/notifications/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleNotificationClick = async (notification) => {
    // mark as read
    if (!notification.is_read) {
      await fetch(
        `http://localhost:3000/api/notifications/${notification.id}/read`,
        { method: "PATCH", credentials: "include" },
      );
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notification.id ? { ...n, is_read: true } : n,
        ),
      );
    }

    // navigate by type
    const { type, related_session_id } = notification;

    if (type === "new_request") {
      navigate(`/${role}/requests`);
    } else if (type === "request_accepted") {
      if (role === "volunteer") navigate(`/${role}/accepted`);
      else navigate(`/${role}/requests`);
    } else if (
      type === "request_rejected" ||
      type === "request_expired" ||
      type === "request_cancelled"
    ) {
      navigate(`/${role}/requests`);
    } else if (
      type === "session_reminder" ||
      type === "session_completed" ||
      type === "session_cancelled" ||
      related_session_id
    ) {
      navigate(`/${role}/sessions`);
    }
    setOpen(false);
  };

  useEffect(() => {
    fetchUnseenCount();
    const interval = setInterval(fetchUnseenCount, 15000);
    return () => clearInterval(interval);
  }, []);

  // panel open হলে fetch + seen all
  useEffect(() => {
    if (open) {
      fetchNotifications();
      markAllSeen();
      setUnseenCount(0);
    }
  }, [open]);

  // outside click এ panel বন্ধ
  useEffect(() => {
    const handleClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={panelRef}>
      {/* BELL ICON */}
      <button
        onClick={() => setOpen(!open)}
        className="relative text-gray-500 hover:text-gray-800 transition"
      >
        <Bell size={20} />
        {unseenCount > 0 && (
          <span className="absolute -top-1 -right-1.5 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
            {unseenCount > 9 ? "9+" : unseenCount}
          </span>
        )}
      </button>

      {/* PANEL */}
      {open && (
        <div className="absolute right-0 top-8 w-80 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden">
          {/* HEADER */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800 text-sm">
              Notifications
            </h3>
            <button
              onClick={fetchNotifications}
              className="text-gray-400 hover:text-gray-600 transition"
              title="Refresh"
            >
              <RefreshCw size={14} />
            </button>
          </div>

          {/* LIST */}
          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="space-y-3 p-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : notifications.length === 0 ? (
              <div className="py-10 text-center text-gray-400">
                <Bell size={30} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">কোনো notification নেই</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => handleNotificationClick(n)}
                  className={`flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition border-b border-gray-50 ${
                    !n.is_read ? "bg-blue-50/50" : ""
                  }`}
                >
                  {/* DOT */}
                  <div className="mt-1.5 flex-shrink-0">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        !n.is_read ? "bg-blue-500" : "bg-transparent"
                      }`}
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 leading-snug">
                      {n.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed line-clamp-2">
                      {n.message}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">
                      {timeAgo(n.created_at)}
                    </p>
                  </div>

                  {/* DELETE */}
                  <button
                    onClick={(e) => handleDelete(e, n.id)}
                    className="text-gray-300 hover:text-red-400 transition flex-shrink-0 mt-0.5"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
