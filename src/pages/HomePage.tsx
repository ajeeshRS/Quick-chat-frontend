import { useEffect, useRef, useState } from 'react';
import AllChats from '../components/AllChats';
import NavBar from '../components/NavBar';
import "../styles/scrollBar.css"
import { Socket, io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ChatView from '../components/ChatView';
import { setPeerData } from '../state/peer/peerSlice';
import { setUser } from '../state/user/userSlice';
import { addMessage } from '../state/message/messageSlice';
import { setOnlineUserData } from '../state/onlineUsers/onlineUsersSlice';
import toast from 'react-hot-toast';

function HomePage() {
  const token = useSelector((state: RootState) => state.token.token)
  const peerData = useSelector((state: RootState) => state.peer.data)
  const dispatch = useDispatch<AppDispatch>()

  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()

  if (location.state?.data) {
    dispatch(setPeerData(location.state.data))
  }

  const [messageInp, setMessageInp] = useState<string>('')

  const socketRef = useRef<Socket | null>(null);

  interface messageData {
    message: string,
    sender: string,
    recipient: string
  }

  // handling message sending
  useEffect(() => {
    const handleSendMessage = () => {
      if (messageInp && socketRef.current) {
        socketRef.current?.emit('send-message', { message: messageInp, socketId: peerData.socketId, email: peerData.email })
      }
    }
    handleSendMessage()
  }, [messageInp])

  useEffect(() => {

    if (!token) {
      navigate("/login")
      return;
    }

    if (!socketRef.current) {
      // connecting to socket io server
      socketRef.current = io("localhost:8001", { auth: { token } })

      // connect event
      socketRef.current.on("connect", () => {
        console.log("connection succeded")
        socketRef.current?.emit("userOnline", 'online')
      })

      socketRef.current.on("connect_error", (err) => {
        toast.error("Authentication error, Please login again!")
        console.log("Connection error", err)
        setTimeout(() => {
          navigate("/login")
        }, 3000)
      })

      socketRef.current.on('online-users', (users) => {
        dispatch(setOnlineUserData(users))
      })

      // recieve message event
      socketRef.current.on('receive-message', (messageData: messageData) => {
        const data =
        {
          content: messageData.message,
          sender: messageData.sender,
          recipient: messageData.recipient
        }
        console.log(data)
        dispatch(addMessage(data))
      })

      // user connection event
      socketRef.current.on("user-connection", (data: any[]) => {
        console.log('userdata: ', data)
        dispatch(setUser(data))
      });

      // user disconnect event
      socketRef.current.on("disconnect", () => {
        socketRef.current?.emit('userOffline', 'offline')
      }
      )
    }

    return () => {
      if (socketRef.current) {
        socketRef.current?.disconnect()
        socketRef.current = null
      }
    }

  }, [navigate])


  return (
    <div className="flex sm:flex-row flex-col-reverse sm:justify-start justify-between w-[100%] h-[100vh] bg-[#fff]">
      <NavBar />
      <AllChats />
      {id ?
        <ChatView setMessageInp={setMessageInp} socket={socketRef} /> :
        <div className='sm:flex hidden sm:w-[65%] w-4/4 sm:h-6/6 h-4/4  bg-white rounded-lg m-2 justify-center shadow-sm sm:shadow-lg items-center'>
          <p className='font-montserrat font-semibold'>
            Select a conversation to start chatting !
          </p>
        </div>
      }
    </div>
  )
}

export default HomePage