import express from "express";
const router = express.Router();
import userCtrl from "../controllers/userCtrl.js";
import auth from "../middleware/auth.js";

router.post("/register", userCtrl.register);

router.post("/activation", userCtrl.activateEmail);

router.post("/login", userCtrl.login);

router.post("/refresh_token", userCtrl.getAccessToken);

router.get("/infor", auth, userCtrl.getUserInfor);

//router.get("/user/:userEmail", userCtrl.getUserByEmail);

router.get("/getbydate/:id", userCtrl.userRecord);

router.get("/logout", userCtrl.logout);

router.get("/allusers", userCtrl.allusers);

router.get("/logout", userCtrl.logout);

router.patch("/update", auth, userCtrl.updateUser);

router.post("/reset", auth, userCtrl.resetPassword);

router.delete("/delete/:id", userCtrl.deleteUser);

export default router;
