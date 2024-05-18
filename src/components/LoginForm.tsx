import { Link } from "react-router-dom"
import googleIcon from "../assets/googleIcon.svg"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginFormData, loginSchema } from "../validations/loginSchema"

function LoginForm() {
    const { handleSubmit, register, formState: { errors } } = useForm<loginFormData>({ resolver: zodResolver(loginSchema) })
    return (
        <div className="bg-[#fff] w-full h-[100vh] flex justify-center items-center">
            <div className="bg-[#fff] sm:mb-0 mb-20 sm:shadow-lg rounded-lg w-3/4 sm:w-2/4 h-2/4 sm:h-3/4 flex flex-col items-center justify-center p-5 ">
                <div>
                    <p className="font-poppins font-bold text-2xl">Welcome back !</p>
                </div>
                <form className="flex flex-col pt-4 items-center w-full sm:w-2/4 font-mukta" onSubmit={handleSubmit((data) => console.log(data))}>

                    <input placeholder="Email" className="bg-[#f5f2f2] mt-2 rounded-lg w-full h-8 px-3 border-0 outline-none" required={true} type="email" {...register("email")} />
                    {errors.email && errors.email.message && (
                        <p className="text-sm font-mukta text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                    <input placeholder="Password" className="bg-[#f5f2f2] mt-2 rounded-lg w-full h-8 px-3 border-0 outline-none" type="password" {...register("password")} />
                    {errors.password && errors.password.message && (
                        <p className="text-sm font-mukta text-red-500">
                            {errors.password.message}
                        </p>
                    )}
                    <p className="w-full flex justify-end py-2 pr-2 text-sm hover:underline font-mukta"><Link to={"/forgot-password"}>Forgot password ?</Link></p>

                    <button className="bg-[#217FEC] font-mukta font-medium text-[#fff] rounded-xl w-1/2 py-2 mt-4 hover:bg-[#1a5a8a] transition-all duration-200 ease-in-out" type="submit">Log in</button>

                </form>
                {/* Divider */}
                <div className="flex w-full items-center justify-center my-2">
                    <div className="w-1/4 bg-gray-300 h-[1px]"></div><div className="px-4 font-mukta">OR</div><div className="w-1/4 bg-gray-300 h-[1px]"></div>
                </div>
                {/* Divider */}
                <button className="bg-[#e5e5e6] font-mukta font-medium text-[#fff] rounded-xl w-2/4 sm:w-1/4 py-2 flex justify-center hover:bg-[#cfd1d1] transition-all duration-200 ease-in-out" type="submit"><img className="w-[22px] h-[22px]" src={googleIcon} alt="google-icon" /></button>
                <div className="pt-8">
                    <p className="font-mukta">Don't have an account ? <span className="font-bold hover:underline"><Link to={"/signup"}>Create one</Link></span></p>
                </div>
            </div>
        </div>)
}

export default LoginForm