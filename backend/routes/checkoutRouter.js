import express from "express";
const checkoutRouter = express.Router();

import CheckoutCtrl from "../controllers/checkoutCtrl.js";

// Add new checkout
checkoutRouter.post("/", CheckoutCtrl.createCheckout);

//Get all checkouts
checkoutRouter.get("/", CheckoutCtrl.getCheckouts);

//Get all orders by user email
checkoutRouter.get("/:userEmail", CheckoutCtrl.getAllOrders);

//Update checkout
checkoutRouter.put("/:id", CheckoutCtrl.updateCheckout);

//Delete checkout
checkoutRouter.delete("/:id", CheckoutCtrl.deleteCheckout);

//Get checkout by uid
checkoutRouter.get("/user/:uid", CheckoutCtrl.getByUid);

//update Service status
checkoutRouter.patch("/:id", CheckoutCtrl.updateServiceStatus);

//Get pending services
checkoutRouter.get("/pending/:userEmail", CheckoutCtrl.getPendingServices);

//get accepted services
checkoutRouter.get("/accepted/:userEmail", CheckoutCtrl.getAcceptedServices);

//get rejected services
checkoutRouter.get("/rejected/:userEmail", CheckoutCtrl.getRejectedServices);

//update feedback status
checkoutRouter.patch("/feedback/:id", CheckoutCtrl.updateFeedbackStatus);

export default checkoutRouter;
