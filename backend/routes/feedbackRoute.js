import express from "express";
const router = express.Router();

import feedbackCtrl from "../controllers/feedbackCtrl.js";

router.route("/").post(feedbackCtrl.createFeedback);

export default router;
