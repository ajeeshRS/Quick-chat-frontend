import { useState } from "react"
import { AUTH_API } from "../api/api"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

function ForgotPassword() {
  const [emailInput, setEmailInput] = useState("")
  const navigate = useNavigate()

  const sendOtp = async () => {
    try {
      const response = await AUTH_API.post("/send-otp", { email: emailInput })
      toast.success(response.data)
      navigate("/verify-otp", { state: { email: emailInput } })
    } catch (err: any) {
      toast.error(err.response.data)
      console.error(err)
    }
  }

  return (
    <div className="bg-[#fff] w-full h-[100vh] flex justify-center items-center">
      <div className="bg-[#fff] sm:mb-0 mb-20 sm:shadow-lg rounded-lg w-3/4 sm:w-2/4 h-2/4 sm:h-3/4 flex flex-col items-center justify-center p-5 ">
        <div className="w-full px-3 sm:px-0 sm:w-1/2 flex justify-center">
          <p className="font-poppins font-semibold text-sm sm:text-lg text-justify">Enter your email and We'll send you an OTP to reset your password.</p>
        </div>
        <form className="flex flex-col pt-4 items-center w-full sm:w-2/4 font-mukta" onSubmit={(e) => {
          e.preventDefault()
          sendOtp()
        }}>
          <input value={emailInput} onChange={(e) => setEmailInput(e.target.value)} placeholder="Email" className="bg-[#f5f2f2] mt-2 rounded-lg w-full h-10 px-3 border-0 outline-none" name="email" type="email" />
          <button className="bg-[#217FEC] font-mukta font-medium text-[#fff] rounded-xl w-1/2 py-2 mt-4 hover:bg-[#1a5a8a] transition-all duration-200 ease-in-out" type="submit">Send OTP</button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword