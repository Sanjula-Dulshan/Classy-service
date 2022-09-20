import express from 'express';
const router= express.Router();
import uploadCtrl from '../controllers/uploadCtrl.js';
import auth from '../middleware/auth.js';

router.post('/upload_avatar', auth, uploadCtrl.upload)

export default router;