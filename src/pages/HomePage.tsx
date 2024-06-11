import { useEffect } from 'react';
import AllChats from '../components/AllChats';
// import ChatView from '../components/ChatView';
import NavBar from '../components/NavBar';
import "../styles/scrollBar.css"
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { setUser } from '../state/user/userSlice';
import ChatView from '../components/ChatView';
import { setPeerData } from '../state/peer/peerSlice';
// import { removeToken } from '../state/token/tokenSlice';

function HomePage() {
  const token = useSelector((state: RootState) => state.token.token)

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation()

  if (location.state?.data) {
    dispatch(setPeerData(location.state.data))
  }


  const { id } = useParams()

  
  
  useEffect(() => {
    const socket = io("localhost:8001", { auth: { token } })
    
    if (!token) {
      navigate("/login")
      return;
    }

    socket.on("connect", () => {
      console.log("connection succeded")
    })

    socket.on("user-connection", (data: any[]) => {
      dispatch(setUser(data))
    });

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <div className="flex sm:flex-row flex-col-reverse sm:justify-start justify-between w-[100%] h-[100vh] bg-[#fff]">
      <NavBar />
      <AllChats />
      {id ?
        <ChatView /> :
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