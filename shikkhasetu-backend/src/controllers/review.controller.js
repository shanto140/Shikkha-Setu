const reviewService = require("../services/review.service");
const { successResponse, errorResponse } = require("../utils/response");

const submitReview = async (req, res) => {
  try {
    const { session_id, organizer_profile_id, volunteer_profile_id, rating } = req.body;
    if (!session_id || !rating) return errorResponse(res, "session_id and rating required", 400);
    if (rating < 1 || rating > 5) return errorResponse(res, "Rating must be between 1 and 5", 400);
    const result = await reviewService.submitReview({ session_id, organizer_profile_id, volunteer_profile_id, rating });
    return successResponse(res, result, "Review submitted");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

module.exports = { submitReview };