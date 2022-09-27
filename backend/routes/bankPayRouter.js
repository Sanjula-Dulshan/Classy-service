import express from "express";
const bankPayRouter = express.Router();

import Bank from "../models/bankPayModel.js";
import BankPayCtrl from "../controllers/bankPayCtrl.js";

// Add new Bank details
bankPayRouter.post("/", BankPayCtrl.createBankPay);

//Get all methods
bankPayRouter.get("/", BankPayCtrl.getBankPay);

//Delete method
bankPayRouter.delete("/:id", BankPayCtrl.deleteBankPay);

//Get method by id
bankPayRouter.get("/user/:invoiceNo", BankPayCtrl.getBankByInvoiceNo);

export default bankPayRouter;