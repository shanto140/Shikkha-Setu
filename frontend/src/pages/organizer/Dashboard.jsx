import { useEffect, useState } from "react";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import VolunteerCard from "../../components/organizer/VolunteerCard";

export default function Dashboard() {
  const [volunteers, setVolunteers] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    class_name: "",
    subject_name: "",
    district: "",
    university_name: "",
    department: "",
    page: 1,
  });

  const [pagination, setPagination] = useState({
    hasNext: false,
    hasPrev: false,
    total: 0,
    totalPages: 1,
  });

  const fetchVolunteers = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams(filters).toString();
      const res = await fetch(`http://localhost:3000/api/volunteers?${query}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setVolunteers(data.data || []);
      setPagination(data.pagination || {});
    } catch (err) {
      console.error("fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, [filters]);

  const updateFilter = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));

  const activeFilterCount = [
    filters.class_name,
    filters.subject_name,
    filters.district,
    filters.university_name,
    filters.department,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Find Volunteers</h1>
        </div>

        <div className="flex gap-6">

        
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-700">Filters</h2>
                {activeFilterCount > 0 && (
                  <button
                    onClick={() =>
                      setFilters({
                        class_name: "",
                        subject_name: "",
                        district: "",
                        university_name: "",
                        department: "",
                        page: 1,
                      })
                    }
                    className="text-xs text-red-500 hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {[
                  { key: "class_name", placeholder: "Class (e.g. Class 10)" },
                  { key: "subject_name", placeholder: "Subject (e.g. Math)" },
                  { key: "district", placeholder: "District" },
                  { key: "university_name", placeholder: "University" },
                  { key: "department", placeholder: "Department" },
                ].map(({ key, placeholder }) => (
                  <div key={key} className="relative">
                    <Search size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
                    <input
                      value={filters[key]}
                      placeholder={placeholder}
                      onChange={(e) => updateFilter(key, e.target.value)}
                      className="w-full border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-1 min-w-0">

            <div className="lg:hidden mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium shadow-sm"
              >
                <SlidersHorizontal size={15} />
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* MOBILE FILTERS DROPDOWN */}
              {showFilters && (
                <div className="mt-2 bg-white border border-gray-100 rounded-xl shadow p-4 space-y-3">
                  {[
                    { key: "class_name", placeholder: "Class" },
                    { key: "subject_name", placeholder: "Subject" },
                    { key: "district", placeholder: "District" },
                    { key: "university_name", placeholder: "University" },
                    { key: "department", placeholder: "Department" },
                  ].map(({ key, placeholder }) => (
                    <input
                      key={key}
                      value={filters[key]}
                      placeholder={placeholder}
                      onChange={(e) => updateFilter(key, e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* VOLUNTEER GRID */}
            {loading ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 animate-pulse">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded" />
                      <div className="h-3 bg-gray-200 rounded w-5/6" />
                    </div>
                  </div>
                ))}
              </div>
            ) : volunteers.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {volunteers.map((v) => (
                  <VolunteerCard key={v.id} volunteer={v} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-700">No volunteers found</h3>
                <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
              </div>
            )}

            {/* PAGINATION */}
            {volunteers.length > 0 && (
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-gray-500">
                  Page {pagination.page} of {pagination.totalPages}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    disabled={filters.page === 1}
                    onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-sm disabled:opacity-40 hover:bg-gray-50 transition"
                  >
                    <ChevronLeft size={15} />
                    Prev
                  </button>

                  <button
                    disabled={!pagination.hasNext}
                    onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-sm disabled:opacity-40 hover:bg-gray-50 transition"
                  >
                    Next
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}