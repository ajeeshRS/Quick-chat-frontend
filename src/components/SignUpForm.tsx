import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema, signUpFormData } from "../validations/signUpSchema"
import { AUTH_API } from "../api/api"
import toast from "react-hot-toast"
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode"

function SignUpForm() {

    interface DecodedToken {
        email: string;
        name: string;
        sub: string
    }
    
    const navigate = useNavigate()
    
    const { handleSubmit, register, reset, formState: { errors } } = useForm<signUpFormData>({ resolver: zodResolver(signUpSchema) })


    const handleSubmission = async (data: object) => {
        try {
            const response = await AUTH_API.post('/signup', data)
            console.log(response.data)
            toast.success(response.data)
            reset()
        } catch (err: any) {
            toast.error(err.response.data)
            console.log(err)
        }
    }


    return (
        <div className="bg-[#fff] w-full h-[100vh] flex justify-center items-center">
            <div className="bg-[#fff] sm:mb-0 mb-20 sm:shadow-lg rounded-lg w-3/4 sm:w-2/4 h-2/4 sm:h-3/4 flex flex-col items-center justify-center p-5 ">
                <div>
                    <p className="font-poppins font-bold text-2xl">Create an account</p>
                </div>
                <form className="flex flex-col pt-4 items-center w-full sm:w-2/4 font-mukta" onSubmit={handleSubmit((data) => handleSubmission(data))}>

                    <input required={true} placeholder="Username" className="bg-[#f5f2f2] mt-2 rounded-lg w-full h-8 px-3 border-0 outline-none" type="text" {...register("userName")} />
                    {errors.userName && errors.userName.message && (
                        <p className="text-sm font-mukta text-red-500">
                            {errors.userName.message}
                        </p>
                    )}

                    <input placeholder="Email" className="bg-[#f5f2f2] mt-2 rounded-lg w-full h-8 px-3 border-0 outline-none" type="email" {...register("email")} />
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

                    <input placeholder="Confirm Password" className="bg-[#f5f2f2] mt-2 rounded-lg w-full h-8 px-3 border-0 outline-none" type="password" {...register("confirm")} />
                    {errors.confirm && errors.confirm.message && (
                        <p className="text-sm font-mukta text-red-500">
                            {errors.confirm.message}
                        </p>
                    )}
                    <button className="bg-[#55AD9B] font-mukta font-medium text-[#fff] rounded-xl w-1/2 py-2 mt-4 hover:bg-[#95D2B3] transition-all duration-200 ease-in-out" type="submit">Sign up</button>
                </form>
                {/* Divider */}
                <div className="flex w-full items-center justify-center my-2">
                    <div className="w-1/4 bg-gray-300 h-[1px]"></div>
                    <div className="px-4 font-mukta">OR</div>
                    <div className="w-1/4 bg-gray-300 h-[1px]"></div>
                </div>
                {/* Divider */}
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        const { credential } = credentialResponse
                        let decoded: DecodedToken;
                        if (credential) {
                            decoded = jwtDecode(credential);
                            const userData = {
                                userName: decoded.name,
                                email: decoded.email,
                                googleId: decoded.sub
                            }
                            handleSubmission(userData)
                            navigate("/")
                        }

                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                    text="signup_with"
                    theme="filled_black"
                    size="medium"
                />
                <div className="pt-8">
                    <p className="font-mukta">Been here before ? <span className="font-bold hover:underline"><Link to={"/login"}>Login</Link></span></p>
                </div>
            </div>
        </div>
    )
}

export default SignUpForm