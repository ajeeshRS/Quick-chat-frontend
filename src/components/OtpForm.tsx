import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { AUTH_API } from "../api/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { setOtpVerified } from "../state/verifyOtp/verifyOtpSlice";

function OtpForm() {
    const navigate = useNavigate()
    const location = useLocation()
    const email = location?.state?.email
    const [userOtp, setUserOtp] = useState("")


    const dispatch = useDispatch<AppDispatch>()

    const otpLength = 5
    const [otp, setOtp] = useState<any[]>(new Array(otpLength).fill(""));
    const inputRefs = useRef<any>([])


    const verifyOtp = async () => {
        try {
            const data = {
                email: email,
                otp: userOtp
            }
            const response = await AUTH_API.post("/verify-otp", data)
            toast.success(response.data)
            dispatch(setOtpVerified())
            navigate("/set-new-password", { state: { email: email } })
            
        } catch (err: any) {
            toast.error(err.response.data)
            console.error(err)
        }
    }

    const resendOtp = async (email: string) => {
        try {
            const response = await AUTH_API.post("/send-otp", { email: email })
            toast.success(response.data)
        } catch (err: any) {
            toast.error(err.response.data)
            console.error(err)
        }
    }


    const handleChange = (index: number, e: any) => {
        e.preventDefault();
        const value = e.target.value;

        if (isNaN(value)) return;

        const newOtp = [...otp];
        // Allow only one input
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // submit trigger
        const combinedOtp = newOtp.join("");
        if (combinedOtp.length === otpLength) setUserOtp(combinedOtp);

        // Move to next input if current field is filled
        if (value && index < otpLength - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleClick = (index: any) => {
        inputRefs.current[index].setSelectionRange(1, 1);

        // optional
        if (index > 0 && !otp[index - 1]) {
            inputRefs.current[otp.indexOf("")].focus();
        }
    };

    const handleKeyDown = (index: number, e: any) => {
        if (
            e.key === "Backspace" &&
            !otp[index] &&
            index > 0 &&
            inputRefs.current[index - 1]
        ) {
            // Move focus to the previous input field on backspace
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <div className="bg-[#fff] w-full h-[100vh] flex justify-center items-center">
            <div className="bg-[#fff] sm:mb-0 mb-20 sm:shadow-lg rounded-lg w-3/4 sm:w-2/4 h-2/4 sm:h-3/4 flex flex-col items-center justify-center p-5 ">
                <div>
                    <p className="font-mukta text-[#5c5c5c] font-bold text-xl">Enter OTP</p>
                </div>
                <form className="flex flex-col pt-4 items-center w-full sm:w-2/4 font-mukta" onSubmit={(e) => {
                    e.preventDefault()
                    verifyOtp()
                }}>
                    <div className="flex">
                        {
                            otp.map((value, index) => (

                                <input
                                    value={value}
                                    ref={(input) => (inputRefs.current[index] = input)}
                                    onChange={(e) => handleChange(index, e)}
                                    onClick={() => handleClick(index)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    key={index}
                                    maxLength={1}
                                    minLength={1}
                                    className="bg-[#f5f2f2] mt-2 text-center rounded-lg w-1/6 h-10 px-2 border-0 outline-none mx-1"
                                    type="text" />
                            ))
                        }


                    </div>
                    <button className="bg-[#55AD9B] font-mukta font-medium text-[#fff] rounded-xl w-1/2 py-2 mt-4 hover:bg-[#95D2B3] transition-all duration-200 ease-in-out" type="submit">Verify OTP</button>
                </form>
                <div className="pt-8">
                    <p className="font-mukta">Didn't get your otp ? <span onClick={() => resendOtp(email)} className="font-bold hover:underline cursor-pointer">Resend</span></p>
                </div>
            </div>
        </div>
    )
}

export default OtpForm