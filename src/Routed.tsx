import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import VerifyOtpPage from "./pages/VerifyOtpPage"
import SetNewPasswordPage from "./pages/SetNewPasswordPage"
import { useSelector } from "react-redux"
import { RootState } from "./state/store"
import NotFoundPage from "./pages/NotFoundPage"

function Routed() {

  const isOtpVerified = useSelector((state: RootState) => state.verifyOtp.value)

  return (
    <Routes>
      <Route path="/" element={null} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/verify-otp" element={<VerifyOtpPage />} />
      {
        isOtpVerified &&
        <Route path="/set-new-password" element={<SetNewPasswordPage />} />
      }
      <Route path="*" element={<NotFoundPage/>} />
    </Routes>
  )
}

export default Routed 