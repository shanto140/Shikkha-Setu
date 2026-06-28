import { X, MapPin, Globe } from "lucide-react";

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
            <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Institution</p>
            <div className="space-y-2">
              <Row label="Name" value={profile.institution_name} />
              <Row label="Type" value={profile.institution_type} />
              <Row label="Description" value={profile.description} />
              <Row label="Website" value={profile.website_url} />
            </div>
          </div>

          <div className="border-t border-gray-100" />

          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Location</p>
            <div className="space-y-2">
              <Row label="District" value={profile.district} />
              <Row label="Upazila" value={profile.upazila} />
            </div>
          </div>
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