import express from "express";
const router = express.Router();
import serviceCtrl from "../controllers/servicesCtrl.js";

router.route("/").post(serviceCtrl.createService).get(serviceCtrl.getServices);
router.route("/:userEmail").get(serviceCtrl.getUserServices);
router.route("/filter/:category").get(serviceCtrl.getServicesByCategory);
router
  .route("/:id")
  .delete(serviceCtrl.deleteService)
  .put(serviceCtrl.updateService);

export default router;
