import express from "express";
const router = express.Router();

import wishListCtrl from "../controllers/wishListCtrl.js";

router.route("/:userEmail").post(wishListCtrl.createWishList);

router.route("/:id").delete(wishListCtrl.deleteWishList);
router.route("/:userEmail").get(wishListCtrl.getAllWishLists);

export default router;
