import express from "express";
const payRouter = express.Router();
import Method from "../models/payMethodModel.js";
import MethodCtrl from "../controllers/PayMethodCtrl.js";


// Add new Bank details
payRouter.post("/", MethodCtrl.createBank);

//Get all methods
payRouter.get("/", MethodCtrl.getBanks);

//Update method
payRouter.put("/:id", MethodCtrl.updateBank);

//Delete method
payRouter.delete("/:id", MethodCtrl.deleteBank);

//Get method by uid
payRouter.get("/user/:uid", MethodCtrl.getByUid);

export default payRouter;