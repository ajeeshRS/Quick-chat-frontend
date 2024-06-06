import { Icon } from "@iconify/react/dist/iconify.js"
import { useLocation } from "react-router-dom"

function NavBar() {

    const location = useLocation()
    
    return (
        <nav className="flex sm:w-[5%] w-4/4 sm:flex-col bg-white rounded-lg m-2 justify-around shadow-lg">
            <div className="w-full sm:flex flex-col sm:h-1/6  justify-around  hidden">
                <button ><p className='font-poppins font-bold text-xl'>QC</p></button>
            </div>
            <div className="w-full flex sm:flex-col sm:h-2/6 justify-around items-center">

                <button className={`w-full flex justify-center cursor-pointer ${location.pathname=="/" &&'bg-[#217fec] text-white'} hover:bg-[#217FEC] hover:text-white py-2 m rounded-lg duration-300 transition-all ease-in-out`}>
                    <Icon icon="gravity-ui:comments" width="32" height="32" />
                </button>

                <button className='w-full flex justify-center cursor-pointer hover:bg-[#217FEC] hover:text-white py-2 m rounded-lg duration-300 transition-all ease-in-out'>
                    <Icon icon="f7:status" width="32" height="32" />
                </button>

                <button className='w-full flex justify-center cursor-pointer hover:bg-[#217FEC] hover:text-white py-2 m rounded-lg duration-300 transition-all ease-in-out'>
                    <Icon icon="basil:phone-solid" width="32" height="32" />
                </button>

            </div>
            <div className="w-full sm:flex hidden flex-col sm:h-1/6 justify-around items-center">

                <button className='w-full flex justify-center cursor-pointer hover:bg-[#e7e7e7]  py-2 m rounded-lg duration-300 transition-all ease-in-out'>
                    <Icon icon="basil:user-solid" width="32" height="32" />
                </button>

                <button className='w-full flex justify-center cursor-pointer hover:bg-[#e7e7e7]  py-2 m rounded-lg duration-300 transition-all ease-in-out'>
                    <Icon icon="basil:logout-solid" width="32" height="32" />
                </button>

            </div>
        </nav>)
}

export default NavBar