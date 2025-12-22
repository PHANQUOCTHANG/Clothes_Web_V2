import nodemailer, { Transporter } from "nodemailer";
import AppError from "@/utils/appError";

// Định nghĩa Interface cho nội dung Email
interface IEmailOptions {
  to: string;
  subject: string;
  html: string;
}

class EmailService {
  private transporter: Transporter;
  private readonly senderEmail = process.env.EMAIL_USER;
  private readonly senderName = process.env.EMAIL_SENDER_NAME || "Clothes Store";

  constructor() {
    // Khởi tạo transporter kết nối với SMTP server
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",
      auth: {
        user: this.senderEmail,
        pass: process.env.EMAIL_PASSWORD, // Sử dụng App Password
      },
    });
  }

  // Phương thức gửi email tổng quát (Private để bao đóng logic)
  private async send(options: IEmailOptions): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: `"${this.senderName}" <${this.senderEmail}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
      });
    } catch (error) {
      console.error("Email Service Error:", error);
      throw new AppError("Lỗi hệ thống khi gửi email.", 500);
    }
  }

  // Chức năng: Gửi mẫu OTP
  async sendOtpEmail(to: string, otp: string): Promise<void> {
    const html = `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
        <h2>Mã xác nhận của bạn</h2>
        <p>Vui lòng sử dụng mã dưới đây để tiếp tục:</p>
        <h1 style="color: #2c3e50; letter-spacing: 5px;">${otp}</h1>
        <p>Mã có hiệu lực trong 5 phút. Không chia sẻ mã này với người khác.</p>
      </div>
    `;
    await this.send({ to, subject: "Mã OTP Xác Thực", html });
  }

  // Chức năng: Gửi mẫu Chào mừng
  async sendWelcomeEmail(to: string, name: string): Promise<void> {
    const html = `<h1>Chào mừng ${name} đến với cửa hàng!</h1>`;
    await this.send({ to, subject: "Chào mừng thành viên mới", html });
  }
}

// Export Singleton instance
export default new EmailService();