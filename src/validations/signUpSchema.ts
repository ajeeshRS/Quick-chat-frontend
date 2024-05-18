import { z } from "zod"

export const signUpSchema = z.object({
    userName: z.string(),
    email: z.string().email(),
    password: z
        .string()
        .min(1, "Password cannot be empty")
        .min(6, "Password is too short"),
    confirm: z.string()
}).refine((data) => data.password == data.confirm, {
    message: "Passwords doesn't match",
    path: ["confirm"]
})

export type signUpFormData = z.infer<typeof signUpSchema>