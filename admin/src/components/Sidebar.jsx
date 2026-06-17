import { NavLink } from "react-router-dom"
import { IoMdAddCircleOutline, IoMdLogOut  } from "react-icons/io"
import { MdFormatListBulletedAdd, MdChecklist } from "react-icons/md";


const Sidebar = ({setToken}) => {
  return (
    <div className="w-[22%] min-h-screen border-r-2 border-gray-100 bg-white">
      <div className="mt-4 px-6 ">
        <h2 className="text-[32px] font-bold ">DELUXE HOTEL</h2>
      </div>
      <div className="flex flex-col gap-4 pt-6">
        <NavLink to='/add' className='flex items-center gap-3 px-4 py-3 border-b-2 border-gray-200 text-gray-600 hover:bg-fuchsia-800 hover:text-white'>
        <IoMdAddCircleOutline className="text-[35px] text-black"/>
        <p  className="hidden md:block text-base">Add Rooms</p>
        </NavLink>

        <NavLink to='/list' className='flex items-center gap-3 px-4 py-3 border-b-2 border-gray-200 text-gray-600 hover:bg-fuchsia-800 hover:text-white'>
        <MdFormatListBulletedAdd className="text-[35px] text-black"/>
        <p className="hidden md:block text-base">Rooms List</p>
        </NavLink>

        <NavLink to='/reservation' className='flex items-center gap-3 px-4 py-3 border-b-2 border-gray-200 text-gray-600 hover:bg-fuchsia-800 hover:text-white'>
        <MdChecklist  className="text-[35px] text-black"/>
        <p  className="hidden md:block text-base">Reservations</p>
        </NavLink>

        <button onClick={() => setToken("")} className="flex items-center gap-3 px-6 py-3 border-b-2 border-gray-200 text-gray-600 hover:bg-fuchsia-800 w-full hover:text-white text-left">
          <IoMdLogOut className="text-[35px] text-black"/>
          <p className="hidden md:block text-base">Logout</p>
        </button>
      </div>
    </div>
  )
}

export default Sidebar