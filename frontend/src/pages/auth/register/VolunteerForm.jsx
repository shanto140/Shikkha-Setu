import { useState, useEffect } from "react";

export default function VolunteerForm({
  formData,
  handleChange,
  handleMultiSelect,
  handleAvailabilityChange,
  addAvailability,
  handleBack,
  handleRegister,
  removeAvailability,
}) {
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/public/subjects")
      .then((r) => r.json())
      .then((d) => setSubjects(d.data || []));
    fetch("http://localhost:3000/api/public/classes")
      .then((r) => r.json())
      .then((d) => setClasses(d.data || []));
  }, []);

  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-gray-800">Volunteer Details</h2>
        <p className="text-sm text-gray-500">
          Tell us about your academic background
        </p>
      </div>

      {/* UNIVERSITY */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          University Name <span className="text-red-500">*</span>
        </label>
        <input
          name="university_name"
          value={formData.university_name}
          onChange={handleChange}
          placeholder="e.g. University of Dhaka"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* DEPARTMENT */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Department <span className="text-red-500">*</span>
        </label>
        <input
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="e.g. Computer Science"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* ACADEMIC YEAR */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Academic Year
        </label>
        <input
          name="academic_year"
          value={formData.academic_year}
          onChange={handleChange}
          placeholder="e.g. 3rd Year"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* BIO */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Bio
        </label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={3}
          placeholder="Write a short bio about yourself..."
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* EXPERIENCE */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Experience
        </label>
        <textarea
          name="experience_text"
          value={formData.experience_text}
          onChange={handleChange}
          rows={3}
          placeholder="Describe your teaching experience..."
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* DISTRICT */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          District <span className="text-red-500">*</span>
        </label>
        <input
          name="district"
          value={formData.district}
          onChange={handleChange}
          placeholder="e.g. Dhaka"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* UPAZILA */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upazila
        </label>
        <input
          name="upazila"
          value={formData.upazila}
          onChange={handleChange}
          placeholder="e.g. Dhanmondi"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* ADDRESS */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows={2}
          placeholder="Full address..."
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* TEACHING MODE */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Teaching Mode
        </label>
        <div className="flex gap-2">
          {["online", "offline", "both"].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() =>
                handleChange({ target: { name: "teaching_mode", value: m } })
              }
              className={`flex-1 py-2 rounded-lg text-sm font-medium border transition capitalize ${
                formData.teaching_mode === m
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* SUBJECTS */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subjects
        </label>
        <div className="grid grid-cols-2 gap-2">
          {subjects.map((sub) => (
            <label
              key={sub}
              className={`flex items-center gap-2 border rounded-lg px-3 py-2 text-sm cursor-pointer transition ${
                formData.subject_names.includes(sub)
                  ? "bg-green-50 border-green-400 text-green-700"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              <input
                type="checkbox"
                value={sub}
                checked={formData.subject_names.includes(sub)}
                onChange={(e) => handleMultiSelect(e, "subject_names")}
                className="accent-green-600"
              />
              {sub}
            </label>
          ))}
        </div>
      </div>

      {/* CLASSES */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Classes
        </label>
        <div className="grid grid-cols-3 gap-2">
          {classes.map((cls) => (
            <label
              key={cls}
              className={`flex items-center gap-2 border rounded-lg px-3 py-2 text-sm cursor-pointer transition ${
                formData.class_names.includes(cls)
                  ? "bg-blue-50 border-blue-400 text-blue-700"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              <input
                type="checkbox"
                value={cls}
                checked={formData.class_names.includes(cls)}
                onChange={(e) => handleMultiSelect(e, "class_names")}
                className="accent-blue-600"
              />
              {cls}
            </label>
          ))}
        </div>
      </div>

      {/* AVAILABILITY */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Availability
        </label>

        <div className="space-y-3">
          {formData.availability.map((slot, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">
                  Slot {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeAvailability(index)}
                  className="text-red-500 text-xs hover:underline"
                >
                  Remove
                </button>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">Day</label>
                <select
                  value={slot.day_of_week}
                  onChange={(e) =>
                    handleAvailabilityChange(
                      index,
                      "day_of_week",
                      e.target.value,
                    )
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Day</option>
                  {[
                    "Saturday",
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ].map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={slot.start_time}
                    onChange={(e) =>
                      handleAvailabilityChange(
                        index,
                        "start_time",
                        e.target.value,
                      )
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={slot.end_time}
                    onChange={(e) =>
                      handleAvailabilityChange(
                        index,
                        "end_time",
                        e.target.value,
                      )
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addAvailability}
          className="mt-3 w-full border-2 border-dashed border-blue-300 text-blue-600 hover:bg-blue-50 py-2 rounded-xl text-sm font-medium transition"
        >
          + Add Time Slot
        </button>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={handleBack}
          className="flex-1 border border-gray-200 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          ← Back
        </button>
        <button
          onClick={handleRegister}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg text-sm font-medium transition"
        >
          Register
        </button>
      </div>
    </div>
  );
}
