import { useRef, useState } from "react";

function OtpForm() {
    const otpLength = 5
    const [otp, setOtp] = useState<any[]>(new Array(otpLength).fill(""));
    const inputRefs = useRef<any>([])

    const onOtpSubmit = (otp: string) => {
        console.log("login success", otp);
    };

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
        if (combinedOtp.length === otpLength) onOtpSubmit(combinedOtp);

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
                    <p className="font-poppins font-bold text-xl">Enter OTP</p>
                </div>
                <form className="flex flex-col pt-4 items-center w-full sm:w-2/4 font-mukta">
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
                    <button className="bg-[#217FEC] font-mukta font-medium text-[#fff] rounded-xl w-1/2 py-2 mt-4 hover:bg-[#1a5a8a] transition-all duration-200 ease-in-out" type="submit">Verify OTP</button>
                </form>
                <div className="pt-8">
                    <p className="font-mukta">Didn't get your otp ? <span className="font-bold hover:underline cursor-pointer">Resend</span></p>
                </div>
            </div>
        </div>
    )
}

export default OtpForm