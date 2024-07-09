import * as express from "express";

declare global {
    namespace Express {
        interface Request {
            user?: any; // hoặc thay thế bằng kiểu cụ thể của bạn nếu có
        }
    }
}