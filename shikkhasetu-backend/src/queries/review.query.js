const pool = require("../config/db");

const createReview = async (data) => {
  const [result] = await pool.execute(
    `INSERT INTO volunteer_reviews 
     (session_id, organizer_profile_id, volunteer_profile_id, rating)
     VALUES (?, ?, ?, ?)`,
    [data.session_id, data.organizer_profile_id, data.volunteer_profile_id, data.rating]
  );
  return result;
};

const updateReview = async (sessionId, rating) => {
  const [result] = await pool.execute(
    `UPDATE volunteer_reviews SET rating = ? WHERE session_id = ?`,
    [rating, sessionId]
  );
  return result;
};

const getReviewBySessionId = async (sessionId) => {
  const [rows] = await pool.execute(
    `SELECT * FROM volunteer_reviews WHERE session_id = ?`,
    [sessionId]
  );
  return rows[0];
};

module.exports = { createReview, updateReview, getReviewBySessionId };