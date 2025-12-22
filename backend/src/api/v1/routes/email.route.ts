// routes/email.routes.ts
import { Router } from 'express';
import EmailController from '@/controllers/email.controller' // Import instance

const router = Router();

// [POST] /send
// Gọi phương thức sendMailToUser trên instance
router.post("/send", EmailController.sendMailToUser); 

export default router;