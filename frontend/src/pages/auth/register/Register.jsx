import { useState } from "react";
import GeneralForm from "./GeneralForm.jsx";
import VolunteerForm from "./VolunteerForm.jsx";
import OrganizerForm from "./OrganizerForm.jsx";
import { validateGeneralUser, validateRoleUser } from "./Validation.jsx";
import { NavLink, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [formType, setFormType] = useState("general");

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    role: "",

    university_name: "",
    department: "",
    academic_year: "",
    bio: "",
    experience_text: "",

    district: "",
    upazila: "",
    address: "",

    teaching_mode: "both",
    open_to_volunteer: false,

    availability: [],

    subject_names: [],
    class_names: [],

    institution_name: "",
    institution_type: "",
    description: "",
    website_url: "",

  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMultiSelect = (e, field) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      [field]: e.target.checked
        ? [...prev[field], value]
        : prev[field].filter((v) => v !== value),
    }));
  };

  const addAvailability = () => {
    setFormData((prev) => ({
      ...prev,
      availability: [
        ...prev.availability,
        { day_of_week: "", start_time: "", end_time: "" },
      ],
    }));
  };

  const removeAvailability = (index) => {
    setFormData((prev) => ({
      ...prev,
      availability: prev.availability.filter((_, i) => i !== index),
    }));
  };

  const handleAvailabilityChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.availability];
      updated[index][field] = value;

      return { ...prev, availability: updated };
    });
  };

  // ---------------- VALIDATION FLOW ----------------

  const handleNext = () => {
    const error = validateGeneralUser(formData);
    if (error) {
      alert(error.message);
      return;
    }

    if (!formData.role) {
      alert("Please select a role");
      return;
    }

    setFormType(formData.role);
  };

  const handleBack = () => {
    setFormType("general");
  };

  const handleRegister = async () => {
    try {
      // 1. validate general
      const generalError = validateGeneralUser(formData);
      if (generalError) {
        alert(generalError.message);
        return;
      }

      // 2. validate role-specific
      const roleError = validateRoleUser(formData, formData.role);
      if (roleError) {
        alert(roleError.message);
        return;
      }

      // 3. API CALL (ONLY ONE REQUEST NOW)
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      // 4. success
      alert("Registration successful 🎉");
      console.log("SERVER RESPONSE:", data);

      const user = data?.data?.user;
      if (user.role === "volunteer") {
        navigate("/volunteer");
      } else {
        navigate("/organizer");
      }

      // 5. reset form
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        password: "",
        role: "",
        university_name: "",
        department: "",
        academic_year: "",
        bio: "",
        experience_text: "",
        district: "",
        upazila: "",
        address: "",
        teaching_mode: "both",
        availability: [],
        subject_ids: [],
        class_ids: [],
        institution_name: "",
        institution_type: "",
        description: "",
        website_url: "",
        contact_person_name: "",
        contact_person_designation: "",
      });

      setFormType("general");
    } catch (err) {
      console.error(err);
      alert("Server error occurred");
    }
  };

  // ---------------- UI ----------------

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[420px] bg-white p-6 rounded shadow space-y-4">
        {formType === "general" && (
          <GeneralForm
            formData={formData}
            handleChange={handleChange}
            handleNext={handleNext}
          />
        )}

        {formType === "volunteer" && (
          <VolunteerForm
            formData={formData}
            handleChange={handleChange}
            handleMultiSelect={handleMultiSelect}
            handleAvailabilityChange={handleAvailabilityChange}
            addAvailability={addAvailability}
            handleBack={handleBack}
            handleRegister={handleRegister}
            removeAvailability={removeAvailability}
          />
        )}

        {formType === "organizer" && (
          <OrganizerForm
            formData={formData}
            handleChange={handleChange}
            handleBack={handleBack}
            handleRegister={handleRegister}
          />
        )}
      </div>
    </div>
  );
}
