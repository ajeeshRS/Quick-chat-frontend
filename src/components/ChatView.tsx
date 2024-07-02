import { Icon } from '@iconify/react/dist/iconify.js'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import { useNavigate, useParams } from 'react-router-dom';
import { addMessage } from '../state/message/messageSlice';
import { Socket } from 'socket.io-client';
import { getCurrentDateAndTime, getFirstLetter } from '../utils/utils';
import { USER_API } from '../api/api';
import toast from 'react-hot-toast';


interface ChatViewProps {
    setMessageInp: (message: string) => void;
    socketRef: React.RefObject<Socket | null>;
}

function ChatView({ setMessageInp, socketRef }: ChatViewProps) {

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
    const onlineUsers = useSelector((state: RootState) => state.onlineUsers.data)
    const user: any = useSelector((state: RootState) => state.user.user)
    const dispatch = useDispatch<AppDispatch>()


    const [toggle, setToggle] = useState<boolean>(false)
    const [messages, setMessages] = useState<any[]>([]);
    const [messageInput, setMessageInput] = useState<string>('')
    const [isUserOnline, setIsUserOnline] = useState(false)
    const [isTyping, setIsTyping] = useState(false)

    // message sending
    const handleSendingMessage = () => {
        setMessageInp(messageInput)
        const { formattedDate, formattedTime } = getCurrentDateAndTime()
        const data = {
            content: messageInput,
            sender: user[0].email,
            recipient: peerData.email,
            date: formattedDate,
            time: formattedTime
        }
        console.log(data)
        dispatch(addMessage(data))
        handleStopTyping()
        setMessageInput('')

    }

    // check for user in online-users-list
    const statusChecker = (onlineUsersData: any, peerEmail: string) => {
        return onlineUsersData[peerEmail] ? true : false
    }

    // For deleting contact
    const deleteContact = async (email: string) => {
        try {
            const res = await USER_API.delete("/delete-contact", {
                params: {
                    email: user[0].email,
                    contactEmail: email
                }
            })
            console.log(res.data)
            toast.success(res.data)
            navigate("/")
            window.location.reload()
        } catch (err: any) {
            console.error("Error: ", err)
            toast.error(err.response.data)
        }
    }


    // handle typing event
    const handleTyping = () => {
        socketRef.current?.emit("typing", {
            sender: user[0].email,
            recipient: peerData.email,
            recipientSocketId: peerData.socketId
        })
    }

    const handleStopTyping = () => {
        socketRef.current?.emit('stopTyping', {
            sender: user[0].email,
            recipient: peerData.email,
            recipientSocketId: peerData.socketId,
        });
    };

    // listen for the user typing and stop typing
    useEffect(() => {
        socketRef.current?.on('typing', (sender) => {
            if (sender === peerData.email) {
                setIsTyping(true);
            }
            console.log(`${sender} is typing...`);
        });

        socketRef.current?.on('stopTyping', (sender) => {
            if (sender === peerData.email) {
                setIsTyping(false);
            }
            console.log(`${sender} stopped typing.`);
        });

        // cleanup function
        return () => {
            socketRef.current?.off('typing');
            socketRef.current?.off('stopTyping');
        };
    }, [socketRef, peerData.email])


    // onilne status updation
    useEffect(() => {
        setIsUserOnline(statusChecker(onlineUsers, peerData.email))
        console.log(onlineUsers)
    }, [onlineUsers, peerData.email])


    useEffect(() => {
        setMessages(messageData)
    }, [messageData])

    return (
        <div className={id ? 'sm:flex sm:w-[65%] w-4/4 sm:h-6/6 h-6/6  sm:bg-[#f8faf4] rounded-lg m-2 justify-between  sm:shadow-lg' : 'sm:flex hidden sm:w-[65%] w-4/4 sm:h-6/6 h-4/4  sm:bg-[#f8faf4] sm:rounded-lg m-2 justify-between shadow-sm sm:shadow-lg'}>
            <div className={toggle ? 'sm:flex sm:w-[55%] w-4/4 sm:h-6/6 h-[90vh] flex-col bg-[#fff] rounded-lg m-2  shadow-sm sm:shadow-lg hidden' : 'flex sm:w-[55%] w-4/4 sm:h-6/6 h-4/4 flex-col bg-[#fff] rounded-lg m-2  shadow-sm sm:shadow-lg'}>

                <div className='w-full h-[10vh] flex justify-between px-6 items-center py-4'>
                    <div className='flex items-center py-2 w-3/4'>
                        <Icon className='sm:hidden block pr-1' onClick={() => navigate(-1)} icon="ion:arrow-back" width="20" height="20" />
                        {
                            peerData.profilePicture !== "" ?

                                <img onClick={() => setToggle(!toggle)} className='w-[45px] h-[45px] object-cover cursor-pointer rounded-full mr-2 ml-2' src={peerData.profilePicture} alt="profile-img" /> : <p className='w-[45px] h-[45px] bg-gray-400 text-xl text-white flex items-center justify-center rounded-full'>{getFirstLetter(peerData.username)}</p>
                        }

                        <div className='flex flex-col font-mukta pl-2'>
                            <p className='font-semibold text-lg'>{peerData.username}</p>
                            <p className='text-[#9b9b9b]'>{isTyping ? 'typing...' : isUserOnline ? 'online' : 'offline'}</p>
                        </div>
                    </div>
                    <div className='flex w-1/4 justify-around'>
                        <button className='hover:bg-slate-100   rounded-xl duration-300 p-2 transition-all ease-in-out w-full flex justify-center items-center'> <Icon icon="mage:phone" width="25" height="25" /></button>
                        <button className='hover:bg-slate-100   rounded-xl duration-300 p-2 transition-all ease-in-out w-full flex justify-center items-center'> <Icon icon="uil:video" width="25" height="25" /></button>

                    </div>
                </div>

                <div className='w-full sm:h-[75vh] h-[65vh]'>
                    <div className="messages rounded-lg h-full p-2 max-w-lg w-full overflow-y-auto mb-6 custom-scrollbar">
                        {messages.length > 0 ? messages.map((message, index) => (
                            <div key={index} className={`text-black mb-2 flex px-5 rounded-s-md ${message.sender === user[0].email ? 'justify-end' : 'justify-start'}`}>
                                <div className={`border px-3 py-1 flex rounded-xl max-w-[70%] break-words ${message.sender === user[0].email ? 'bg-[#55AD9B] rounded-br-none text-white' : 'rounded-bl-none'}`}>
                                    <p className='pr-3'>
                                        {message.content}
                                    </p>
                                    <p className='text-xs flex items-end'>
                                        {message.time} {
                                            message.sender === user[0].email &&
                                            <Icon className='pl-1 pt-2' icon="charm:tick-double" width="25" height="25" />
                                        }
                                    </p>
                                </div>
                            </div>
                        )) : <div className="h-4/6 flex justify-center items-center text-gray-500 mt-4">
                            No messages yet. Start the conversation!
                        </div>}
                    </div>
                </div>


                <div className='w-full  h-[10vh] flex  justify-center items-center'>
                    <input type="text" className='bg-[#e8f1e6] w-5/6 h-10 rounded-lg outline-none px-4' value={messageInput} onChange={(e) => setMessageInput(e.target.value)} onKeyDown={() => handleTyping()} onBlur={() => handleStopTyping()} />
                    <div className='hover:bg-slate-100 transition duration-300 ease-in-out h-10 mx-1 flex items-center rounded-lg'>
                        <Icon className='mx-2 cursor-pointer text-[#55AD9B]' icon="mingcute:send-fill" width="30" height="30" onClick={() => handleSendingMessage()} />
                    </div>
                </div>
            </div>

            {/* contact info */}
            <div className={id && toggle ? 'sm:flex sm:w-[45%] w-4/4 sm:h-6/6 h-[90vh] flex-col bg-[#fff] rounded-lg m-2 justify-between  shadow-sm sm:shadow-lg ' : 'sm:flex hidden sm:w-[45%] w-4/4 sm:h-6/6 h-[95vh] flex-col bg-[#fff] rounded-lg m-2 justify-between shadow-sm sm:shadow-lg '}>

                <div className='w-full px-4 flex flex-start pt-4 items-center'>
                    <Icon className='sm:hidden block px-1' onClick={() => setToggle(!toggle)} icon="ion:arrow-back" width="25" height="25" />
                    <p className='font-semibold text-xl font-poppins px-5'>Contact Info</p>
                </div>

                <div className='w-full h-[50vh] flex flex-col items-center justify-center sm:pt-0 pt-10'>
                    {
                        peerData.profilePicture !== "" ?
                            <img className='w-[90px] h-[90px] object-cover rounded-full border-4' src={peerData.profilePicture} alt="profile-img" /> :
                            <p className='w-[90px] h-[90px] bg-gray-400 text-2xl text-white flex items-center justify-center rounded-full'>{getFirstLetter(peerData.username)}</p>
                    }


                    <p className='font-semibold font-mukta py-2'>{peerData.username}</p>
                    <div className='w-full flex flex-col items-center'>
                        <p className='flex justify-center items-center font-mukta w-full'><Icon className='mx-1' icon="ic:outline-email" width="20" height="20" />{peerData.email}</p>
                        <button className='flex  items-center  h-10 font-poppins font-semibold  transition-all duration-300 ease-in-out  text-red-500 hover:text-red-600 mt-6'><Icon className='mr-1' icon="material-symbols:block" width="20" height="20" />Block</button>
                    </div>
                </div>

                <div className='w-full flex flex-col items-center h-[20vh]'>
                    <button onClick={() => deleteContact(peerData.email)} className='font-poppins text-sm font-semibold hover:bg-red-600 transition-all duration-300 ease-in-out bg-red-500 text-white p-2 rounded-xl'>Delete contact</button>
                </div>
            </div>
        </div>)
}

export default ChatView