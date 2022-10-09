import express from "express";
const router = express.Router();

import feedbackCtrl from "../controllers/feedbackCtrl.js";

router.route("/").post(feedbackCtrl.createFeedback);
router.route("/").get(feedbackCtrl.getAllFeedbacks);
router.route("/:id").put(feedbackCtrl.updateFeedback);
router.route("/:id").delete(feedbackCtrl.deleteFeedback);

export default router;
