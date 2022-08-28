import express from "express";
const router = express.Router();
import serviceCtrl from "../controllers/servicesCtrl.js";

router.route("/").post(serviceCtrl.createService);

export default router;
