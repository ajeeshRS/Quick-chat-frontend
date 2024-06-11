import { Icon } from "@iconify/react/dist/iconify.js"
import SearchPopup from "./SearchPopup"
import { useParams } from "react-router-dom"

function AllChats() {

  const { id } = useParams()

  return (
    <div className={id ? 'sm:flex hidden sm:w-[30%] w-4/4 sm:h-6/6 h-4/4 flex-col bg-white rounded-lg m-2 justify-between shadow-sm sm:shadow-lg' : 'flex sm:w-[30%] w-4/4 sm:h-6/6 h-4/4 flex-col bg-white rounded-lg m-2 justify-between shadow-sm sm:shadow-lg'}>
      <div className='flex w-full px-6 justify-between items-center pt-2 h-[10vh]'>
        <p className='font-poppins font-semibold text-xl'>All chats</p>
        <div className='flex sm:w-1/6 w-2/6 justify-between'>
          <SearchPopup />
          <button className='hover:bg-[#e7e7e7]   rounded-lg duration-300 p-2 transition-all ease-in-out w-full flex justify-center items-center'>
            <Icon icon="octicon:filter-16" width="20" height="20" />
          </button>
          <button className='hover:bg-[#e7e7e7]  rounded-lg duration-300 p-2 transition-all ease-in-out w-full flex justify-center items-center sm:hidden'>
            <Icon icon="charm:menu-kebab" width="20" height="20" />
          </button>
        </div>
      </div>
      <div className='flex w-full px-2 justify-center items-center pt-1'>
        <input type="text" placeholder='Search' className='w-3/4 h-[35px] outline-none border-2 px-3 rounded-lg' />
        <button className='p-2 rounded-full bg-[#217FEC] ml-2 font-mukta text-white hover:bg-[#2161ec] '><Icon icon="mingcute:search-line" width="20" height="20" /></button>
      </div>

      <div className='py-0 mt-4 px-2 h-[70vh] overflow-y-auto custom-scrollbar'>

        <div className='w-full h-20 cursor-pointer hover:bg-[#ebebeb] duration-300 transition-all ease-in-out text-black flex items-center rounded-md '>
          <div className='w-1/4 pl-4'>
            <img className='w-[60px] h-[60px] object-cover rounded-lg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRacjU65XgKFIqTBY97et63NLX-sGjzAjuR2bMuWto3lg&s" alt="profile-img" />
          </div>
          <div className='w-3/4'>
            <div className='flex w-full justify-between pr-2'>
              <p className='font-semibold font-mukta'>Peter</p>
              <p className='font-mukta text-[#818181]'>14-5-2024</p>
            </div>
            <p className='font-mukta text-[#818181]'>how are you</p>
          </div>
        </div>
        <div className='w-full h-20 cursor-pointer hover:bg-[#ebebeb] duration-300 transition-all ease-in-out text-black flex items-center rounded-md '>
          <div className='w-1/4 pl-4'>
            <img className='w-[60px] h-[60px] object-cover rounded-lg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRacjU65XgKFIqTBY97et63NLX-sGjzAjuR2bMuWto3lg&s" alt="profile-img" />
          </div>
          <div className='w-3/4'>
            <div className='flex w-full justify-between pr-2'>
              <p className='font-semibold font-mukta'>Peter</p>
              <p className='font-mukta text-[#818181]'>14-5-2024</p>
            </div>
            <p className='font-mukta text-[#818181]'>how are you</p>
          </div>
        </div>
        <div className='w-full h-20 cursor-pointer hover:bg-[#ebebeb] duration-300 transition-all ease-in-out text-black flex items-center rounded-md '>
          <div className='w-1/4 pl-4'>
            <img className='w-[60px] h-[60px] object-cover rounded-lg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRacjU65XgKFIqTBY97et63NLX-sGjzAjuR2bMuWto3lg&s" alt="profile-img" />
          </div>
          <div className='w-3/4'>
            <div className='flex w-full justify-between pr-2'>
              <p className='font-semibold font-mukta'>Peter</p>
              <p className='font-mukta text-[#818181]'>14-5-2024</p>
            </div>
            <p className='font-mukta text-[#818181]'>how are you</p>
          </div>
        </div>
      </div>
    </div>)
}

export default AllChats