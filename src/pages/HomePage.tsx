import { useEffect } from 'react';
import AllChats from '../components/AllChats';
// import ChatView from '../components/ChatView';
import NavBar from '../components/NavBar';
import "../styles/scrollBar.css"
import { io } from "socket.io-client";
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
// import { removeToken } from '../state/token/tokenSlice';

function HomePage() {
  const token = useSelector((state: RootState) => state.token.token)

  if (token) {
    const socket = io("localhost:8001", { auth: { token } })
    useEffect(() => {
      socket.on("connect", () => {
        console.log("connection succeded")
      })

      return () => {
        socket.disconnect()
      }
    }, [])
  }

  return (
    <div className="flex sm:flex-row flex-col-reverse sm:justify-start justify-between w-[100%] h-[100vh] bg-[#fff]">
      <NavBar />
      <AllChats />
      {/* <ChatView /> */}
      <div className='flex sm:w-[65%] w-4/4 sm:h-6/6 h-4/4  bg-white rounded-lg m-2 justify-center shadow-sm sm:shadow-lg items-center'>
        <p className='font-montserrat font-semibold'>
          Select a conversation to start chatting !
        </p>
      </div>
    </div>
  )
}

export default HomePage