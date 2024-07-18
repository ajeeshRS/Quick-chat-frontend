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
import { getCurrentDateAndTime } from '../utils/utils';
import { USER_API } from '../api/api';

function HomePage() {

  const token = useSelector((state: RootState) => state.token.token)
  const peerData = useSelector((state: RootState) => state.peer.data)
  const userData: any = useSelector((state: RootState) => state.user.user)
  const dispatch = useDispatch<AppDispatch>()

  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()

  if (location.state?.data) {
    dispatch(setPeerData(location.state.data))
  }

  const [messageInp, setMessageInp] = useState<string>('')
  const [contactDetails, setContactDetails] = useState([])

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

  // fetch user contact details
  useEffect(() => {
    if (userData && userData[0]) {

      const contactEmails = userData[0].contacts.map((contact: any) => contact.email).join(',')
      console.log(contactEmails)
      const fetchContactDetails = async () => {
        try {
          const res = await USER_API.get("/contacts-details", {
            params: {
              emails: contactEmails
            }
          })
          console.log("contact details:", res.data.contactDetails)
          setContactDetails(res.data.contactDetails)

        } catch (err) {
          console.error("Error in fetching contact detail: ", err)
        }
      }

      fetchContactDetails()
    }
  }, [userData])

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

      // on connection error
      socketRef.current.on("connect_error", (err) => {
        // toast message
        toast.error("Authentication error, Please login again!")
        console.log("Connection error", err)
        // navigate to login page after 3sec
        setTimeout(() => {
          navigate("/login")
        }, 3000)
      })

      // set online users
      socketRef.current.on('online-users', (users) => {
        dispatch(setOnlineUserData(users))
      })

      // recieve message event
      socketRef.current.on('receive-message', (messageData: messageData) => {
        const { formattedDate, formattedTime } = getCurrentDateAndTime()
        const data =
        {
          content: messageData.message,
          sender: messageData.sender,
          recipient: messageData.recipient,
          date: formattedDate,
          time: formattedTime
        }
        console.log(data)
        dispatch(addMessage(data))
      })

      socketRef.current.on('updateSocket', (data) => {
        const { email, socketId } = data
        console.log(`updated socketId : ${socketId} for ${email}`)
        setContactDetails((prevContact: any) => prevContact.map((contact: any) => contact.email === email ? { ...contact, socketId } : contact))
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
    // cleanup function
    return () => {
      if (socketRef.current) {
        socketRef.current?.disconnect()
        socketRef.current = null
      }
    }

  }, [token])

  // to change the id(socketId) from the params when contactdetails(socketId of peer changes) changes
  useEffect(() => {
    if (location.pathname.startsWith('/chat/')) {
      const currentContact: any = contactDetails.find((contact: any) => contact.socketId === id || contact.email === peerData.email);
      if (currentContact && currentContact.socketId !== id) {
        navigate(`/chat/${currentContact.socketId}`, { state: { data: { ...currentContact, socketId: currentContact.socketId } } });
      }
    }
  }, [contactDetails])


  return (
    <div className="flex sm:flex-row flex-col-reverse sm:justify-start justify-between w-[100%] h-[100vh] bg-[#fff]">
      <NavBar />
      <AllChats contactDetails={contactDetails} />
      {id ?
        <ChatView setMessageInp={setMessageInp} socketRef={socketRef} /> :
        <div className='sm:flex hidden sm:w-[65%] w-4/4 sm:h-6/6 h-4/4  bg-[#f8faf4] rounded-lg m-2 justify-center shadow-sm sm:shadow-lg items-center'>
          <p className='font-mukta text-gray-600'>
            Select a conversation to start chatting !
          </p>
        </div>
      }
    </div>
  )
}

export default HomePage