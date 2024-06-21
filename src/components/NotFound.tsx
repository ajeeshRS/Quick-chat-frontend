import { Link } from "react-router-dom"

function NotFound() {
    return (
        <div className="w-full h-[90vh] flex justify-center items-center px-10">
            <div className="text-center">
                {/* 404 heading */}
                <h1 className="text-[#2b2b2b] font-sans font-extrabold text-3xl pb-5">
                    404
                </h1>
                <h2 className="font-poppins font-semibold text-xl text-gray-600 ">
                    Page Not found
                </h2>
                {/* 404 message */}
                <p className="font-poppins text-md text-gray-500 font-normal pt-3">
                    We&apos;re sorry,the page you requested could not be found!
                </p>
                {/* Go back to home button */}
                <button className="w-[150px] h-10 mt-4 rounded-lg bg-[#55AD9B] text-white hover:bg-[#95D2B3] transition duration-300">
                    <Link to="/">Go back to home</Link>
                </button>
            </div>
        </div>
    )
}

export default NotFound