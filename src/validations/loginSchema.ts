import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(1, "Password cannot be empty")
        .min(6, "Password is too short")
})

export type loginFormData = z.infer<typeof loginSchema>