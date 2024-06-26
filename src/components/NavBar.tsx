import { Icon } from "@iconify/react/dist/iconify.js"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import { AppDispatch } from "../state/store"
import { removeToken } from "../state/token/tokenSlice"

function NavBar() {

    const location = useLocation()
    const dispatch = useDispatch<AppDispatch>()

    const handleLogout = () => {
        dispatch(removeToken())
    }
    return (
        <nav className="flex sm:w-[5%] w-4/4 sm:flex-col bg-[#f8faf4] rounded-lg m-2 justify-around shadow-lg">
            <div className="w-full sm:flex flex-col sm:h-1/6  justify-around  hidden">
                <button ><p className='font-poppins font-bold text-xl'>QC</p></button>
            </div>
            <div className="w-full flex sm:flex-col sm:h-2/6 justify-around items-center">

                <button className={`w-full flex justify-center cursor-pointer ${location.pathname == "/" && 'bg-[#55AD9B] text-white'} hover:bg-[#55AD9B] hover:text-white py-2 m rounded-xl duration-300 transition-all ease-in-out`}>
                    <Icon icon="gravity-ui:comments" width="32" height="32" />
                </button>

                <button className='w-full flex justify-center cursor-pointer hover:bg-[#55AD9B] hover:text-white py-2 m rounded-xl duration-300 transition-all ease-in-out'>
                    <Icon icon="f7:status" width="32" height="32" />
                </button>

                <button className='w-full flex justify-center cursor-pointer hover:bg-[#55AD9B] hover:text-white py-2 m rounded-xl duration-300 transition-all ease-in-out'>
                    <Icon icon="basil:phone-solid" width="32" height="32" />
                </button>

            </div>
            <div className="w-full sm:flex hidden flex-col sm:h-1/6 justify-around items-center">

                <button className='w-full flex justify-center cursor-pointer hover:bg-slate-200  py-2 m rounded-xl duration-300 transition-all ease-in-out'>
                    <Icon icon="basil:user-solid" width="32" height="32" />
                </button>

                <button onClick={() => handleLogout()} className='w-full flex justify-center cursor-pointer hover:bg-slate-200  py-2 m rounded-xl duration-300 transition-all ease-in-out'>
                    <Icon icon="basil:logout-solid" width="32" height="32" />
                </button>
            </div >
        </nav >)
}

export default NavBar