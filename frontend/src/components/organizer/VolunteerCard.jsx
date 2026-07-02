import { useEffect, useState } from "react";
import { Star } from "lucide-react";

import {
  MapPin,
  GraduationCap,
  BookOpen,
  Clock,
  Monitor,
  Users,
  FileText,
} from "lucide-react";
import RequestModal from "./RequestModal";

export default function VolunteerCard({ volunteer }) {
  const [open, setOpen] = useState(false);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/volunteers/subjects/${volunteer.id}`,
          { credentials: "include" },
        );
        const data = await res.json();
        setSubjects(data.data || []);
      } catch (err) {
        console.log("subject fetch error", err);
      }
    };
    fetchSubjects();
  }, [volunteer.id]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/volunteers/classes/${volunteer.id}`,
          { credentials: "include" },
        );
        const data = await res.json();
        setClasses(data.data || []);
      } catch (err) {
        console.log("class fetch error", err);
      }
    };
    fetchClasses();
  }, [volunteer.id]);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/volunteers/availability/${volunteer.id}`,
          { credentials: "include" },
        );
        const data = await res.json();
        setAvailability(data.data || []);
      } catch (err) {
        console.log("availability fetch error", err);
      }
    };
    fetchAvailability();
  }, [volunteer.id]);

  const formatTime = (time) => {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    const h = parseInt(hour, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return `${h12}:${minute} ${ampm}`;
  };

  const groupedAvailability = availability.reduce((acc, a) => {
    if (!acc[a.day_of_week]) acc[a.day_of_week] = [];
    acc[a.day_of_week].push(a);
    return acc;
  }, {});

  return (
    <>
      <div className="bg-[#2a3950] border border-[#334155] rounded-xl shadow-lg shadow-black/20 hover:shadow-xl hover:border-blue-500/30 transition p-5 flex flex-col gap-4">
        {/* HEADER */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            {volunteer.full_name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="font-bold text-base leading-tight text-gray-100">
              {volunteer.full_name}
            </h2>
            <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
              <GraduationCap size={12} />
              <span>
                {volunteer.university_name} • {volunteer.department}
              </span>
            </div>
          </div>
        </div>

        {/* INFO */}
        <div className="space-y-1.5 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-gray-500 flex-shrink-0" />
            <span>
              {volunteer.district}, {volunteer.upazila}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Monitor size={14} className="text-gray-500 flex-shrink-0" />
            <span className="capitalize bg-blue-500/10 text-blue-400 text-xs px-2 py-0.5 rounded border border-blue-500/20">
              {volunteer.teaching_mode}
            </span>
          </div>

          {volunteer.bio && (
            <div className="bg-[#0f172a] border border-[#334155] rounded-lg p-3 mt-1">
              <div className="flex items-center gap-1.5 mb-1">
                <FileText size={12} className="text-gray-500" />
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  About
                </span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                {volunteer.bio}
              </p>
            </div>
          )}
        </div>

        {/* CLASSES */}
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <Users size={13} className="text-gray-400" />
            <p className="text-xs font-semibold text-gray-300">Classes</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {classes.length > 0 ? (
              classes.map((c) => (
                <span
                  key={c.id}
                  className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs px-2 py-1 rounded"
                >
                  {c.name}
                </span>
              ))
            ) : (
              <span className="text-gray-500 text-xs">No classes</span>
            )}
          </div>
        </div>

        {/* SUBJECTS */}
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <BookOpen size={13} className="text-gray-400" />
            <p className="text-xs font-semibold text-gray-300">Subjects</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {subjects.length > 0 ? (
              subjects.map((s) => (
                <span
                  key={s.id}
                  className="bg-green-500/10 text-green-400 border border-green-500/20 text-xs px-2 py-1 rounded flex items-center gap-1"
                >
                  {s.name}
                  {s.proficiency_level && (
                    <span className="bg-green-500/20 text-green-300 px-1 rounded text-[10px]">
                      {s.proficiency_level}
                    </span>
                  )}
                </span>
              ))
            ) : (
              <span className="text-gray-500 text-xs">No subjects</span>
            )}
          </div>
        </div>

        {/* AVAILABILITY */}
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <Clock size={13} className="text-gray-400" />
            <p className="text-xs font-semibold text-gray-300">Availability</p>
          </div>
          <div className="flex flex-col gap-1">
            {Object.keys(groupedAvailability).length > 0 ? (
              Object.entries(groupedAvailability).map(([day, slots]) => (
                <div
                  key={day}
                  className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-xs px-3 py-1.5 rounded"
                >
                  <span className="font-medium text-purple-300 w-24 flex-shrink-0">
                    {day}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {slots.map((slot, idx) => (
                      <span
                        key={idx}
                        className="bg-purple-500/20 text-purple-200 px-2 py-0.5 rounded"
                      >
                        {formatTime(slot.start_time)} –{" "}
                        {formatTime(slot.end_time)}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <span className="text-gray-500 text-xs">No availability set</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 mt-2">
          {volunteer.avg_rating ? (
            <span className="flex items-center gap-1 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-2 py-0.5 rounded-full text-xs font-medium">
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              {volunteer.avg_rating}
              <span className="text-yellow-500/80 font-normal">({volunteer.total_reviews} reviews)</span>
            </span>
          ) : (
            <span className="text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full font-medium">
              No reviews yet
            </span>
          )}
        </div>

        {/* ACTION */}
        <button
          onClick={() => setOpen(true)}
          className="mt-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg transition text-sm font-medium"
        >
          Send Request
        </button>
      </div>

      {/* MODAL */}
      {open && (
        <RequestModal
          volunteerId={volunteer.id}
          classes={classes}
          subjects={subjects}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}