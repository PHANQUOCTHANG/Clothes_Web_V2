// controllers/email.controller.ts
import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import emailService from "../services/email.service";
import { IEmailData } from "@/interface/email.interface";

class EmailController {

    // [POST] /api/v1/email/send
    // Sử dụng arrow function để đảm bảo 'this' không bị mất khi truyền vào router
    sendMailToUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        // Ép kiểu dữ liệu request body sang IEmailData
        const emailData: IEmailData = {
            to: req.body.email,
            subject: req.body.subject || "Xác minh tài khoản",
            body: req.body.body || "Vui lòng xác minh tài khoản của bạn.",
            name: req.body.name,
            verificationLink: req.body.link, // Giả định link xác minh được gửi qua body
        };

        // Gọi Service để gửi mail
        await emailService.sendEmail(emailData);

        // Trả về response thành công
        res.status(200).json({
            success: true,
            message: "Send email success",
        });
    });
}

// Export một instance của Class
export default new EmailController();