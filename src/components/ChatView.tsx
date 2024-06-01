import { Icon } from '@iconify/react/dist/iconify.js'
import { useState } from 'react'

function ChatView() {

    interface messageType {
        text: string,
        sent: boolean,
        received: boolean
    }

    const [messages, setMessages] = useState<messageType[]>([]);

    return (
        <div className='flex sm:w-[65%] w-4/4 sm:h-6/6 h-4/4  bg-white rounded-lg m-2 justify-between shadow-sm sm:shadow-lg'>
            <div className='flex sm:w-[55%] w-4/4 sm:h-6/6 h-4/4 flex-col bg-white rounded-lg m-2  shadow-sm sm:shadow-lg'>

                <div className='w-full h-[10vh] flex justify-between px-6 items-center py-4 bg'>
                    <div className='flex items-center py-2'>

                        <img className='w-[45px] h-[45px] object-cover rounded-full mr-2' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRacjU65XgKFIqTBY97et63NLX-sGjzAjuR2bMuWto3lg&s" alt="profile-img" /><div className='flex flex-col font-mukta'>
                            <p className='font-semibold text-lg'>Peter</p>
                            <p className='text-[#9b9b9b]'>offline</p>
                        </div>
                    </div>
                    <div className='flex w-1/4 justify-around'>
                        <button className='hover:bg-[#e7e7e7]   rounded-lg duration-300 p-2 transition-all ease-in-out w-full flex justify-center items-center'> <Icon icon="mage:phone" width="25" height="25" /></button>
                        <button className='hover:bg-[#e7e7e7]   rounded-lg duration-300 p-2 transition-all ease-in-out w-full flex justify-center items-center'> <Icon icon="uil:video" width="25" height="25" /></button>

                    </div>
                </div>

                <div className='w-full h-[75vh]'>
                    <div className="messages rounded-lg h-full p-2 max-w-md w-full overflow-y-auto mb-6 custom-scrollbar">
                        {Array.isArray(messages) && messages.length > 0 ? messages.map((message, index) => (
                            <div key={index} className={`text-black mb-2 flex px-5 rounded-s-md ${message.sent ? 'justify-end' : 'justify-start'}`}>
                                <p className={`border px-3 py-1 rounded-xl max-w-[70%] break-words ${message.sent ? 'bg-[#2161EC] rounded-br-none text-white' : 'rounded-bl-none'}`}>
                                    {message.text}
                                </p>
                            </div>
                        )) : <div className="h-4/6 flex justify-center items-center text-gray-500 mt-4">
                            No messages yet. Start the conversation!
                        </div>}
                    </div>
                </div>


                <div className='w-full  h-[10vh] flex  justify-center items-center'>
                    <input type="text" className='bg-slate-100 w-5/6 h-10 rounded-lg outline-none px-4' />
                    <Icon className='mx-2 cursor-pointer text-[#217FEC] hover:text-[#2172ec]' icon="mingcute:send-fill" width="30" height="30" />
                </div>
            </div>

            <div className='flex sm:w-[45%] w-4/4 sm:h-6/6 h-4/4 flex-col bg-[#fff] rounded-lg m-2 justify-between shadow-sm sm:shadow-lg '>

                <div className='w-full px-4 flex flex-start pt-4'>
                    <p className='font-semibold text-xl font-poppins'>Contact Info</p>
                </div>

                <div className='w-full h-[50vh] flex flex-col items-center'>
                    <img className='w-[90px] h-[90px] object-cover rounded-full border-4' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRacjU65XgKFIqTBY97et63NLX-sGjzAjuR2bMuWto3lg&s" alt="profile-img" />
                    <p className='font-semibold font-mukta py-2'>Peter</p>
                    <div className='w-full flex flex-col items-center'>

                        <p className='flex justify-center items-center w-full'><Icon className='mx-1' icon="ic:outline-email" width="20" height="20" />peter@gmail.com</p>
                        <p className='flex justify-center items-center w-full'><Icon className='mr-1' icon="material-symbols:join-outline" width="20" height="20" />connected on 14-5-2024</p>
                        <button className='flex  items-center  h-10 font-poppins font-semibold  transition-all duration-300 ease-in-out  text-red-500 hover:text-red-600 mt-6'><Icon className='mr-1' icon="material-symbols:block" width="20" height="20" />Block</button>
                    </div>
                </div>

                <div className='w-full flex flex-col items-center h-[20vh]'>
                    <button className='font-poppins text-sm font-semibold hover:bg-red-600 transition-all duration-300 ease-in-out bg-red-500 text-white p-2 rounded-xl'>Delete contact</button>
                </div>
            </div>
        </div>)
}

export default ChatView