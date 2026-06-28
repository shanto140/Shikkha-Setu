export default function OrganizerForm({
  formData,
  handleChange,
  handleBack,
  handleRegister,
}) {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-gray-800">Organizer Details</h2>
        <p className="text-sm text-gray-500">Tell us about your institution</p>
      </div>

      {/* INSTITUTION NAME */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Institution Name <span className="text-red-500">*</span>
        </label>
        <input
          name="institution_name"
          value={formData.institution_name}
          onChange={handleChange}
          placeholder="e.g. Dhanmondi Tutorial Home"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* INSTITUTION TYPE */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Institution Type
        </label>
        <input
          name="institution_type"
          value={formData.institution_type}
          onChange={handleChange}
          placeholder="e.g. School, NGO, Coaching Center"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          placeholder="Brief description of your institution..."
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Upazila</label>
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows={2}
          placeholder="Full address..."
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* WEBSITE */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
        <input
          name="website_url"
          value={formData.website_url}
          onChange={handleChange}
          placeholder="https://yourwebsite.com"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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