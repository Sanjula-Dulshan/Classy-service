import express from "express";
const router = express.Router();
import serviceCtrl from "../controllers/servicesCtrl.js";

router.route("/").post(serviceCtrl.createService).get(serviceCtrl.getServices);
router.route("/:userEmail").get(serviceCtrl.getUserServices);
router.route("/:id").delete(serviceCtrl.deleteService);

export default router;
