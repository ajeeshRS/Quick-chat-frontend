import { Icon } from '@iconify/react/dist/iconify.js'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { useNavigate, useParams } from 'react-router-dom';


function ChatView({ setMessageInp }: any) {

    interface peer {
        username: string,
        email: string,
        profilePicture: string,
        bio: string,
        status: string,
        blockedContacts: [],
        contacts: [],
        socketId: string
    }

    const { id } = useParams()
    const navigate = useNavigate()
    
    const peerData: peer = useSelector((state: RootState) => state.peer.data)
    const messageData = useSelector((state: RootState) => state.messages.messages)
    const user = useSelector((state: RootState) => state.user.user)


    const [toggle, setToggle] = useState<boolean>(false)
    const [messages, setMessages] = useState<any[]>([]);
    const [messageInput, setMessageInput] = useState<string>('')


    const handleSendingMessage = () => {
        setMessageInp(messageInput)
        setMessageInput('')
    }

    useEffect(() => {
        setMessages(messageData)
    }, [])

    return (
        <div className={id ? 'sm:flex sm:w-[65%] w-4/4 sm:h-6/6 h-6/6  bg-white rounded-lg m-2 justify-between shadow-sm sm:shadow-lg' : 'sm:flex hidden sm:w-[65%] w-4/4 sm:h-6/6 h-4/4  bg-white rounded-lg m-2 justify-between shadow-sm sm:shadow-lg'}>
            <div className={toggle ? 'sm:flex sm:w-[55%] w-4/4 sm:h-6/6 h-[90vh] flex-col bg-white rounded-lg m-2  shadow-sm sm:shadow-lg hidden' : 'flex sm:w-[55%] w-4/4 sm:h-6/6 h-4/4 flex-col bg-white rounded-lg m-2  shadow-sm sm:shadow-lg'}>

                <div className='w-full h-[10vh] flex justify-between px-6 items-center py-4 bg'>
                    <div className='flex items-center py-2'>
                        <Icon className='sm:hidden block' onClick={() => navigate(-1)} icon="ion:arrow-back" width="20" height="20" />
                        <img onClick={() => setToggle(!toggle)} className='w-[45px] h-[45px] object-cover rounded-full mr-2 pl-2' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRacjU65XgKFIqTBY97et63NLX-sGjzAjuR2bMuWto3lg&s" alt="profile-img" />
                        <div className='flex flex-col font-mukta pl-2'>
                            <p className='font-semibold text-lg'>{peerData.username}</p>
                            <p className='text-[#9b9b9b]'>{peerData.status}</p>
                        </div>
                    </div>
                    <div className='flex w-1/4 justify-around'>
                        <button className='hover:bg-[#e7e7e7]   rounded-lg duration-300 p-2 transition-all ease-in-out w-full flex justify-center items-center'> <Icon icon="mage:phone" width="25" height="25" /></button>
                        <button className='hover:bg-[#e7e7e7]   rounded-lg duration-300 p-2 transition-all ease-in-out w-full flex justify-center items-center'> <Icon icon="uil:video" width="25" height="25" /></button>

                    </div>
                </div>

                <div className='w-full sm:h-[75vh] h-[65vh]'>
                    <div className="messages rounded-lg h-full p-2 max-w-md w-full overflow-y-auto mb-6 custom-scrollbar">
                        {messages.length > 0 ? messages.map((message, index) => (
                            <div key={index} className={`text-black mb-2 flex px-5 rounded-s-md ${message.sender == user ? 'justify-end' : 'justify-start'}`}>
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
                    <input type="text" className='bg-slate-100 w-5/6 h-10 rounded-lg outline-none px-4' value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
                    <Icon className='mx-2 cursor-pointer text-[#217FEC] hover:text-[#2172ec]' icon="mingcute:send-fill" width="30" height="30" onClick={() => handleSendingMessage()} />
                </div>
            </div>

            {/* contact info */}
            <div className={id && toggle ? 'sm:flex sm:w-[45%] w-4/4 sm:h-6/6 h-[90vh] flex-col bg-[#fff] rounded-lg m-2 justify-between  shadow-sm sm:shadow-lg ' : 'sm:flex hidden sm:w-[45%] w-4/4 sm:h-6/6 h-[95vh] flex-col bg-[#fff] rounded-lg m-2 justify-between shadow-sm sm:shadow-lg '}>

                <div className='w-full px-4 flex flex-start pt-4 items-center'>
                    <Icon className='sm:hidden block px-1' onClick={() => setToggle(!toggle)} icon="ion:arrow-back" width="25" height="25" />
                    <p className='font-semibold text-xl font-poppins px-5'>Contact Info</p>
                </div>

                <div className='w-full h-[50vh] flex flex-col items-center justify-center sm:pt-0 pt-10'>
                    <img className='w-[90px] h-[90px] object-cover rounded-full border-4' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRacjU65XgKFIqTBY97et63NLX-sGjzAjuR2bMuWto3lg&s" alt="profile-img" />
                    <p className='font-semibold font-mukta py-2'>{peerData.username}</p>
                    <div className='w-full flex flex-col items-center'>

                        <p className='flex justify-center items-center w-full'><Icon className='mx-1' icon="ic:outline-email" width="20" height="20" />{peerData.email}</p>
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