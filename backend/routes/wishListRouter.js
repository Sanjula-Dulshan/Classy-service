import express from "express";
const router = express.Router();

import wishListCtrl from "../controllers/wishListCtrl.js";

router
  .route("/")
  .post(wishListCtrl.createWishList)
  .get(wishListCtrl.getAllWishLists);

router.route("/:id").delete(wishListCtrl.deleteWishList);

export default router;
