import express from "express";
const cardPayRouter = express.Router();

import Card from "../models/cardPayModel.js";

import CardPayCtrl from "../controllers/cardPayCtrl.js";

// Add new Card details
cardPayRouter.post("/", CardPayCtrl.createCardPay);

//Get all methods
cardPayRouter.get("/", CardPayCtrl.getCardPay);

//Delete method
cardPayRouter.delete("/:id", CardPayCtrl.deleteCardPay);

//Get method by id
cardPayRouter.get("/user/:uid", CardPayCtrl.getCardByUid);

export default cardPayRouter;