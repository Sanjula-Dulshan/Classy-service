import express from 'express';
const router = express.Router();
import userCtrl from '../controllers/userCtrl.js';


router.post('/register', userCtrl.register)

router.post('/activation', userCtrl.activateEmail)

router.post('/login', userCtrl.login)

router.post('/refresh_token', userCtrl.getAccessToken)

export default router;