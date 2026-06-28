const reviewQuery = require("../queries/review.query");

const submitReview = async (data) => {
  const existing = await reviewQuery.getReviewBySessionId(data.session_id);
  if (existing) {
    return await reviewQuery.updateReview(data.session_id, data.rating);
  }
  return await reviewQuery.createReview(data);
};

module.exports = { submitReview };