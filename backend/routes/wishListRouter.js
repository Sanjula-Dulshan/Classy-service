import express from "express";
const router = express.Router();

import wishListCtrl from "../controllers/wishListCtrl.js";

router
  .route("/")
  .post(wishListCtrl.createWishList)
  .get(wishListCtrl.getAllWishLists);

export default router;
