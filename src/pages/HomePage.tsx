import AllChats from '../components/AllChats';
import NavBar from '../components/NavBar';
import "../styles/scrollBar.css"
function HomePage() {

  return (
    <div className="flex sm:flex-row flex-col-reverse sm:justify-start justify-between w-[100%] h-[100vh] bg-[#fff]">
      <NavBar />
      <AllChats />
    </div>
  )
}

export default HomePage