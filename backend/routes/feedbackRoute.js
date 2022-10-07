import express from "express";
const router = express.Router();

import feedbackCtrl from "../controllers/feedbackCtrl.js";

router.route("/").post(feedbackCtrl.createFeedback);
router.route("/").get(feedbackCtrl.getAllFeedbacks);

export default router;
