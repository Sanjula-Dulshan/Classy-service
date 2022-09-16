import express from "express";
const checkoutRouter = express.Router();

import CheckoutCtrl from "../controllers/checkoutCtrl.js";

// Add new checkout
checkoutRouter.post("/", CheckoutCtrl.createCheckout);

//Get all checkouts
checkoutRouter.get("/", CheckoutCtrl.getCheckouts);

//Update checkout
checkoutRouter.put("/:id", CheckoutCtrl.updateCheckout);

//Delete checkout
checkoutRouter.delete("/:id", CheckoutCtrl.deleteCheckout);

//Get checkout by uid
checkoutRouter.get("/user/:uid", CheckoutCtrl.getByUid);

export default checkoutRouter;