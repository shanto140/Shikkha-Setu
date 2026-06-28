const express = require("express");
const router = express.Router();

const requestController = require("../controllers/request.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

router.use(authMiddleware);

router.post("/", roleMiddleware("organizer"), requestController.createRequest);

router.patch(
  "/:id/accept",
  roleMiddleware("volunteer"),
  requestController.acceptRequest,
);

router.patch(
  "/:id/reject",
  roleMiddleware("volunteer"),
  requestController.rejectRequest,
);


router.patch(
  "/:id/cancel",
  roleMiddleware("organizer"),
  requestController.cancelRequest
);

module.exports = router;
