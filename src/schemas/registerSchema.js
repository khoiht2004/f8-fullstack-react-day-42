import { z } from "zod";

export const registerSchema = z
    .object({
        firstName: z.string().min(1, "Tên không được để trống"),
        lastName: z.string().min(1, "Họ không được để trống"),
        email: z
            .string()
            .min(1, "Email không được để trống")
            .email("Email không đúng định dạng"),
        password: z
            .string()
            .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
        confirmPassword: z
            .string()
            .min(1, "Vui lòng xác nhận mật khẩu"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Mật khẩu xác nhận không khớp",
        path: ["confirmPassword"],
    });
