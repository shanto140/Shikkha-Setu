import { X, MapPin, BookOpen, GraduationCap, Clock } from "lucide-react";
import { formatTime,formatDate} from "../../../../utils/timeFormat";

export default function ProfileDetailsModal({ profile, onClose }) {
  if (!profile) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
        
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white">
          <h2 className="font-semibold text-gray-800">Profile Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-4">
         
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase mb-2">General</p>
            <div className="space-y-2">
              <Row label="Full Name" value={profile.full_name} />
              <Row label="Email" value={profile.email} />
              <Row label="Phone" value={profile.phone} />
            </div>
          </div>

          <div className="border-t border-gray-100" />

         
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Academic</p>
            <div className="space-y-2">
              <Row label="University" value={profile.university_name} />
              <Row label="Department" value={profile.department} />
              <Row label="Academic Year" value={profile.academic_year} />
            </div>
          </div>

          <div className="border-t border-gray-100" />

          
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Location</p>
            <div className="space-y-2">
              <Row label="District" value={profile.district} />
              <Row label="Upazila" value={profile.upazila} />
              <Row label="Address" value={profile.address} />
            </div>
          </div>

          <div className="border-t border-gray-100" />

           
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Teaching</p>
            <div className="space-y-2">
              <Row label="Mode" value={profile.teaching_mode} />
              <Row label="Bio" value={profile.bio} />
              <Row label="Experience" value={profile.experience_text} />
            </div>
          </div>

          <div className="border-t border-gray-100" />

        
          {profile.subjects?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Subjects</p>
              <div className="flex flex-wrap gap-2">
                {profile.subjects.map((s) => (
                  <span key={s.id} className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

       
          {profile.classes?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Classes</p>
              <div className="flex flex-wrap gap-2">
                {profile.classes.map((c) => (
                  <span key={c.id} className="bg-green-50 text-green-600 text-xs px-3 py-1 rounded-full">
                    {c.name}
                  </span>
                ))}
              </div>
            </div>
          )}

         
          {profile.availability?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Availability</p>
              <div className="space-y-1.5">
                {profile.availability.map((a) => (
                  <div key={a.id} className="flex items-center justify-between text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                    <span className="font-medium">{a.day_of_week}</span>
                    <span> {formatTime(a.start_time)} -  {formatTime(a.end_time)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2 text-sm">
      <span className="text-gray-400 w-28 flex-shrink-0">{label}</span>
      <span className="text-gray-700">{value}</span>
    </div>
  );
}