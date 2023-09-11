import { ZodType, z } from "zod";
import { LoginFormData, RegisterFormData } from "../interfaces/zod.interface";
import { User } from "../app/features/user/userSlice";

export const registerSchema: ZodType<RegisterFormData> = z.object({
    username: z.string().min(4),
    email: z.string().email(),
    password: z.string().min(6),
    confrimPassword: z.string()
}).refine(data => data.password === data.confrimPassword, {
    message: 'Password do not match',
    path: ["confrimPassword"]
})


export const loginSchema: ZodType<LoginFormData> = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export const userSchema: ZodType<Partial<User>> = z.object({
    username: z.string().trim().min(4),
    email: z.string().email().trim(),
    profile: z.nullable(z.string()).optional()
})