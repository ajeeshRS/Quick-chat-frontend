import { Icon } from "@iconify/react/dist/iconify.js"
import SearchPopup from "./SearchPopup"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getFirstLetter } from "../utils/utils"

function AllChats({ contactDetails }: any) {

  const { id } = useParams()
  const [contacts, setContacts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setContacts(contactDetails)
  }, [contactDetails])

  return (
    <div className={id ? 'sm:flex hidden sm:w-[30%] w-4/4 sm:h-6/6 h-4/4 flex-col bg-[#fff] rounded-lg m-2 justify-between shadow-sm sm:shadow-lg' : 'flex sm:w-[30%] w-4/4 sm:h-6/6 h-4/4 flex-col bg-[#fff] rounded-lg m-2 justify-between shadow-sm sm:shadow-lg'}>
      <div className='flex w-full px-6 justify-between items-center pt-2 h-[10vh]'>
        <p className='font-poppins font-semibold text-xl'>All chats</p>
        <div className='flex sm:w-1/4 w-2/6 justify-between'>
          <SearchPopup />
          <button className='hover:bg-slate-100 w-[40px] h-[40px] rounded-xl duration-300  transition-all ease-in-out flex justify-center items-center'>
            <Icon icon="octicon:filter-16" width="20" height="20" />
          </button>
          <button className='hover:bg-slate-100 w-[40px] h-[40px] rounded-xl duration-300 transition-all ease-in-out  flex justify-center items-center sm:hidden'>
            <Icon icon="charm:menu-kebab" width="20" height="20" />
          </button>
        </div>
      </div>
      <div className='flex w-full px-2 justify-center items-center pt-1'>
        <input type="text" placeholder="search" className='w-3/4 h-[35px] placeholder:text-[#7a7a7a] bg-[#e8f1e6] outline-none px-3 rounded-lg shadow-sm' />
        <button className='p-2 rounded-full bg-[#55AD9B] ml-2 font-mukta text-white hover:bg-[#95D2B3] transition duration-300 ease-in-out '><Icon icon="mingcute:search-line" width="20" height="20" /></button>
      </div>

      <div className={`py-0 mt-4 px-2 h-[70vh] overflow-y-auto custom-scrollbar ${contacts.length === 0 && 'flex justify-center pt-20'}`}>

        {
          contacts && contacts.length > 0 ? contacts.map((contact: any, index) => (
            < div key={index} className='w-full h-20 cursor-pointer hover:bg-slate-100 duration-300 transition-all ease-in-out text-black flex items-center rounded-xl' onClick={() => {
              navigate(`/chat/${contact.socketId}`, { state: { data: contact } })
            }}>
              <div className='w-1/4 pl-4'>

                {
                  contact.profilePicture !== "" ?
                    <img className='w-[55px] h-[55px] object-cover rounded-full' src={contact.profilePicture} alt="profile-img" />
                    : <p className='w-[55px] h-[55px] bg-gray-400 text-xl text-white flex items-center justify-center rounded-full'>{getFirstLetter(contact.username)}</p>
                }
              </div>
              <div className='w-3/4'>
                <div className='flex w-full justify-between pr-2'>
                  <p className='font-semibold font-mukta'>{contact.username}</p>
                  <p className='font-mukta text-[#818181]'>14-5-2024</p>
                </div>
                <p className='font-mukta text-[#818181]'>how are you</p>
              </div>
            </div>

          )) :
            <div className="flex flex-col items-center text-center w-full">
              <p className="font-mukta text-gray-400">
                No chats here yet.<br /> Start a new chat by clicking
              </p>
              <Icon className="text-gray-400 my-2" icon="fluent:chat-add-32-regular" width="20" height="20" />
            </div>
        }

      </div>
    </div >)
}

export default AllChats