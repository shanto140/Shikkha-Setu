 const pool = require("../config/db");


const createRequest = async (data) => {
  const [result] = await pool.execute(
    `INSERT INTO session_requests
     (
       organizer_profile_id,
       volunteer_profile_id,
       subject_id,
       class_id,
       description,
       mode,
       expires_at
     )
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.organizer_profile_id,
      data.volunteer_profile_id,
      data.subject_id,
      data.class_id,
      data.description || null,
      data.mode,
      data.expires_at,
    ],
  );

  return result;
};

const updateRequestStatus = async (requestId, status) => {
  const [result] = await pool.execute(
    `UPDATE session_requests SET status = ? WHERE id = ?`,
    [status, requestId]
  );
  return result;
};

module.exports = {
  createRequest,
  updateRequestStatus,
};
