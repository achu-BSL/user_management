import { ZodType, z } from "zod";
import { LoginFormData, RegisterFormData } from "../interfaces/zod.interface";

export const registerSchema: ZodType<RegisterFormData> = z.object({
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