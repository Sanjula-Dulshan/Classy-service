import express from "express";
const router = express.Router();

import uploadCtrl from "../controllers/uploadCtrl.js";

// Upload image
router.post("/upload", uploadCtrl.upload);

// Delete image
router.post("/destroy", uploadCtrl.destroy);

export default router;
