import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react'
import { USER_API } from '../api/api';
import { useNavigate } from 'react-router-dom';

function SearchPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [result, setResult] = useState([])

    const navigate = useNavigate()

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const handleSearch = async () => {
        try {
            const res = await USER_API.get(`/search-user/${query}`)
            setResult(res.data)
        } catch (err) {
            console.error('Error: ', err)
        }
    };

    const goToChat = (data: any) => {
        togglePopup()
        setQuery('')
        setResult([])
        navigate(`/${data.socketId}`, { state: { data } })
    }


    return (
        <div className="relative">
            <button onClick={togglePopup} className='hover:bg-[#e7e7e7]   rounded-lg duration-300 p-2 transition-all ease-in-out w-full flex justify-center items-center'><Icon icon="fluent:chat-add-32-regular" width="20" height="20" /></button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 w-3/4 sm:w-1/2 h-1/2 rounded shadow-lg">

                        <form onSubmit={(e) => {
                            e.preventDefault()
                            handleSearch()
                        }} className='flex flex-col'>
                            <div className="mb-4">
                                <div className='flex justify-between items-center h-10'>
                                    <p className="block text-gray-700 mb-2 sm:pl-0 pl-2 font-mukta font-semibold">Search for user</p>
                                    <button
                                        onClick={togglePopup}
                                        className=" text-gray-800 hover:text-gray-700 pb-5"
                                    >
                                        &times;
                                    </button>

                                </div>
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="w-full px-3 py-2 border outline-none rounded"
                                    placeholder="Type your search..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-4 py-1 bg-[#217FEC] text-white rounded hover:bg-[#1a69c4] transition-all duration-300 ease-in-out "
                            >
                                Search
                            </button>
                        </form>
                        <div className='py-0 mt-4 px-2 h-[20vh] overflow-y-auto custom-scrollbar'>
                            {
                                result.length > 0 && result.map((data: any, index) => (

                                    <div key={index} onClick={() => goToChat(data)} className='w-full h-10 cursor-pointer hover:bg-[#ebebeb] duration-300 transition-all ease-in-out text-black flex items-center rounded-md '>
                                        <div className='w-1/4 pl-4 flex items-center'>
                                            <img className='w-[30px] h-[30px] object-cover rounded-lg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRacjU65XgKFIqTBY97et63NLX-sGjzAjuR2bMuWto3lg&s" alt="profile-img" />
                                            <p className='font-semibold font-mukta px-3'>{data.username}</p>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>
            )}
        </div>)
}

export default SearchPopup