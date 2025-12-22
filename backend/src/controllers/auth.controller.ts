import { Request, Response } from "express";
import asyncHandler from "@/utils/asyncHandler";
import { AuthService } from "@/services/auth.service";
import { OtpService } from "@/services/otp.service";

export class AuthController {
  constructor(
    private readonly authService: AuthService ,
    private readonly otpService: OtpService
  ) {}

  // POST /auth/register
  register = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.authService.register(req.body);
    res.status(201).json(result);
  });

  // POST /auth/login
  login = asyncHandler(async (req: Request, res: Response) => {
    console.log("OK");
    const result = await this.authService.login(req.body);
    res.json(result);
  });

  // POST /auth/refresh
  refresh = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    const result = await this.authService.refresh(refreshToken);
    res.json(result);
  });

  // POST /auth/send-otp
  sendOtp = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    await this.otpService.sendOtp(email);
    res.status(204).send();
  });

  // POST /auth/verify-otp
  verifyOtp = asyncHandler(async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    await this.otpService.verifyOtp(email, otp);
    res.status(204).send();
  });


  // POST /auth/reset-password
  resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const { email, otp, newPassword } = req.body;
    await this.authService.resetPassword(email, otp, newPassword);
    res.status(204).send();
  });

  // POST /auth/logout
  logout = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    await this.authService.logout(refreshToken);
    res.status(204).send();
  });
}
