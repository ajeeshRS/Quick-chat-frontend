import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { newPasswordFormData, newPasswordSchema } from "../validations/newPasswordSchema"
import { useLocation, useNavigate } from "react-router-dom"
import { AUTH_API } from "../api/api"
import toast from "react-hot-toast"

function NewPasswordForm() {
    const location = useLocation()
    const email = location?.state?.email
    const navigate = useNavigate()
    const { handleSubmit, register, reset, formState: { errors } } = useForm<newPasswordFormData>({ resolver: zodResolver(newPasswordSchema) })

    const resetPassword = async (data: newPasswordFormData) => {
        try {
            const response = await AUTH_API.post("/reset-password", { email: email, password: data.password })
            toast.success(response.data)
            reset()
            navigate("/login")
        } catch (err: any) {
            toast.error(err.response.data)
            console.error(err)
        }
    }



    return (
        <div className="bg-[#fff] w-full h-[100vh] flex justify-center items-center">
            <div className="bg-[#fff] sm:mb-0 mb-20 sm:shadow-lg rounded-lg w-3/4 sm:w-2/4 h-2/4 sm:h-3/4 flex flex-col items-center justify-center p-5 ">
                <div>
                    <p className="font-poppins font-bold text-2xl">Set new password</p>
                </div>
                <form className="flex flex-col pt-4 items-center w-full sm:w-2/4 font-mukta" onSubmit={handleSubmit((data) => resetPassword(data))}>
                    <input placeholder="New password" className="bg-[#f5f2f2] mt-2 rounded-lg w-full h-8 px-3 border-0 outline-none" {...register("password")} type="password" />
                    {errors.password && errors.password.message && (
                        <p className="text-sm font-mukta text-red-500">
                            {errors.password.message}
                        </p>
                    )}
                    <input placeholder="Re-enter your new password" className="bg-[#f5f2f2] mt-2 rounded-lg w-full h-8 px-3 border-0 outline-none" {...register("confirm")} type="password" />
                    {errors.confirm && errors.confirm.message && (
                        <p className="text-sm font-mukta text-red-500">
                            {errors.confirm.message}
                        </p>
                    )}
                    <button className="bg-[#217FEC] font-mukta font-medium text-[#fff] rounded-xl w-1/2 py-2 mt-4 hover:bg-[#1a5a8a] transition-all duration-200 ease-in-out" type="submit">Reset</button>
                </form>
            </div>
        </div>
    )
}

export default NewPasswordForm