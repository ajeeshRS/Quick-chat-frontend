
function NewPasswordForm() {
    return (
        <div className="bg-[#fff] w-full h-[100vh] flex justify-center items-center">
            <div className="bg-[#fff] sm:mb-0 mb-20 sm:shadow-lg rounded-lg w-3/4 sm:w-2/4 h-2/4 sm:h-3/4 flex flex-col items-center justify-center p-5 ">
                <div>
                    <p className="font-poppins font-bold text-2xl">Set new password</p>
                </div>
                <form className="flex flex-col pt-4 items-center w-full sm:w-2/4 font-mukta">
                    <input placeholder="New password" className="bg-[#f5f2f2] mt-2 rounded-lg w-full h-8 px-3 border-0 outline-none" name="password" type="password" />
                    <input placeholder="Re-enter your new password" className="bg-[#f5f2f2] mt-2 rounded-lg w-full h-8 px-3 border-0 outline-none" name="confirm-password" type="password" />
                    <button className="bg-[#217FEC] font-mukta font-medium text-[#fff] rounded-xl w-1/2 py-2 mt-4 hover:bg-[#1a5a8a] transition-all duration-200 ease-in-out" type="submit">Reset</button>
                </form>
            </div>
        </div>
    )
}

export default NewPasswordForm