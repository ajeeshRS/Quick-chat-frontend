import { useEffect } from 'react';
import AllChats from '../components/AllChats';
import ChatView from '../components/ChatView';
import NavBar from '../components/NavBar';
import "../styles/scrollBar.css"
import { io } from "socket.io-client";

function HomePage() {
  const socket = io("localhost:8001")

  useEffect(() => {
    socket.io.on("open", () => {
      console.log("connection succeded")
    })


    return () => {
      socket.disconnect()
    }
  }, [])
  return (
    <div className="flex sm:flex-row flex-col-reverse sm:justify-start justify-between w-[100%] h-[100vh] bg-[#fff]">
      <NavBar />
      <AllChats />
      <ChatView />
    </div>
  )
}

export default HomePage