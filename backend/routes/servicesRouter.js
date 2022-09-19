import express from "express";
const router = express.Router();
import serviceCtrl from "../controllers/servicesCtrl.js";

router.route("/").post(serviceCtrl.createService).get(serviceCtrl.getServices);
router.route("/:userEmail").get(serviceCtrl.getUserServices);
router
  .route("/:id")
  .delete(serviceCtrl.deleteService)
  .put(serviceCtrl.updateService);

// router.route("/pending/:userEmail").get(serviceCtrl.getPendingServices);

export default router;
