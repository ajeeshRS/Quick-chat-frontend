import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import VerifyOtpPage from "./pages/VerifyOtpPage"
import SetNewPasswordPage from "./pages/SetNewPasswordPage"
function Routed() {
  return (
    <Routes>
      <Route path="/" element={null} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/verify-otp" element={<VerifyOtpPage />} />
      <Route path="/set-new-password" element={<SetNewPasswordPage />} />
    </Routes>
  )
}

export default Routed