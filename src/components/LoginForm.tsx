import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginFormData, loginSchema } from "../validations/loginSchema"
import { GoogleLogin } from "@react-oauth/google"
import toast from "react-hot-toast"
import { AUTH_API } from "../api/api"
import { jwtDecode } from "jwt-decode"
import { useDispatch } from "react-redux"
import { setToken } from "../state/token/tokenSlice"

function LoginForm() {
    interface DecodedToken {
        email: string;
        name: string;
        sub: string
    }
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { handleSubmit, register, formState: { errors }, reset } = useForm<loginFormData>({ resolver: zodResolver(loginSchema) })

    const handleLogin = async (data: object) => {
        try {
            const response = await AUTH_API.post("/login", data)
            dispatch(setToken(response.data.token))
            reset()
            toast.success(response.data.message)
            navigate("/")
        } catch (err: any) {
            toast.error(err.response.data)
            console.error(err)
        }
    }

    return (
        <div className="bg-[#fff] w-full h-[100vh] flex justify-center items-center">
            <div className="bg-[#fff] sm:mb-0 mb-20 sm:shadow-lg rounded-lg w-3/4 sm:w-2/4 h-2/4 sm:h-3/4 flex flex-col items-center justify-center p-5 ">
                <div>
                    <p className="font-poppins font-bold text-2xl">Welcome back !</p>
                </div>
                <form className="flex flex-col pt-4 items-center w-full sm:w-2/4 font-mukta" onSubmit={handleSubmit((data) => handleLogin(data))}>

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

                    <button className="bg-[#55AD9B] font-mukta font-medium text-[#fff] rounded-xl w-1/2 py-2 mt-4 hover:bg-[#95D2B3] transition-all duration-200 ease-in-out" type="submit">Log in</button>

                </form>
                {/* Divider */}
                <div className="flex w-full items-center justify-center my-2">
                    <div className="w-1/4 bg-gray-300 h-[1px]"></div><div className="px-4 font-mukta">OR</div><div className="w-1/4 bg-gray-300 h-[1px]"></div>
                </div>
                {/* Divider */}
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        const { credential } = credentialResponse
                        let decoded: DecodedToken;
                        if (credential) {
                            decoded = jwtDecode(credential);
                            const userData = {
                                email: decoded.email,
                                googleId: decoded.sub
                            }
                            handleLogin(userData)
                            navigate("/")
                        }

                    }}
                    onError={() => {
                        toast.error('Login Failed');
                    }}
                    text="signin_with"
                    theme="filled_black"
                    size="medium"
                />
                <div className="pt-8">
                    <p className="font-mukta">Don't have an account ? <span className="font-bold hover:underline"><Link to={"/signup"}>Create one</Link></span></p>
                </div>
            </div>
        </div>)
}

export default LoginForm