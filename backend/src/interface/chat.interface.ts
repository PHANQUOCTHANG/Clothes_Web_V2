import mongoose, { Schema, Document, Types } from "mongoose";

export interface IChat {
    userId: Types.ObjectId;
    role: 'user' | 'admin' | 'system';
    message: string;
    deleted: boolean;
    timeAdminAccess?: Date | null;
    deletedAt?: Date | null;
}

export interface IChatDocument extends IChat, Document {
    createdAt: Date;
    updatedAt: Date;
}

export interface IMessageData {
    userId: Types.ObjectId | string;
    role: 'user' | 'admin' | 'system';
    message: string;
}

