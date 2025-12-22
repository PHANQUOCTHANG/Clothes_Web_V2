import { Document } from "mongoose";

export interface IOtp {
  email: string;
  otpHash: string;
  expiresAt: Date;
  verified: boolean; 
}

export interface IOtpDocument extends IOtp, Document {
  id: string;
}