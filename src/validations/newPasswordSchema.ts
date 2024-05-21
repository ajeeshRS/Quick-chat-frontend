import { z } from "zod";

export const newPasswordSchema = z.object({
    password: z
        .string()
        .min(1, "Password cannot be empty")
        .min(6, "Password is too short"),
    confirm: z.string()

}).refine((data) => data.password == data.confirm, {
    message: "Passwords doesn't match",
    path: ["confirm"]
})

export type newPasswordFormData = z.infer<typeof newPasswordSchema>