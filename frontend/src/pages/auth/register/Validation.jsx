export const validateGeneralUser = (data) => {
  if (!data.full_name?.trim()) {
    return { field: "full_name", message: "Full name is required" };
  }

  if (!data.email?.trim()) {
    return { field: "email", message: "Email is required" };
  }

  if (!data.phone?.trim()) {
    return { field: "phone", message: "Phone number is required" };
  }

  if (!data.password?.trim()) {
    return { field: "password", message: "Password is required" };
  }

  if (!data.role) {
    return { field: "role", message: "Please select a role" };
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(data.email)) {
    return { field: "email", message: "Invalid email format" };
  }

  const bdPhoneRegex = /^(01[3-9]\d{8})$/;
  if (!bdPhoneRegex.test(data.phone)) {
    return { field: "phone", message: "Invalid BD phone number (01XXXXXXXXX)" };
  }

  if (data.password.length < 6) {
    return {
      field: "password",
      message: "Password must be at least 6 characters",
    };
  }

  return null;
};

export const validateRoleUser = (data, role) => {

  if (role === "volunteer") {
    
    if (!data.university_name?.trim()) {
      return {
        field: "university_name",
        message: "University name is required",
      };
    }

    if (!data.department?.trim()) {
      return { field: "department", message: "Department is required" };
    }

    if (!data.district?.trim()) {
      return { field: "district", message: "District is required" };
    }

    if (!data.teaching_mode) {
      return { field: "teaching_mode", message: "Select teaching mode" };
    }

    if (!data.subject_names?.length) {
      return { field: "subject_names", message: "Select at least one subject" };
    }

    if (!data.class_names?.length) {
      return { field: "class_names", message: "Select at least one class" };
    }
  }

  if (role === "organizer") {
    if (!data.institution_name?.trim()) {
      return {
        field: "institution_name",
        message: "Institution name is required",
      };
    }

    if (!data.district?.trim()) {
      return { field: "district", message: "District is required" };
    }
  }

  return null;
};
