
import { Link, useNavigate, useLocation } from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  
  const handleRoomsClick = () => {
    
    if (location.pathname === '/') {
      const roomsSection = document.getElementById('rooms-selection');
      if (roomsSection) {
        roomsSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
    
      navigate('/');
      setTimeout(() => {
        const roomsSection = document.getElementById('rooms-selection');
        if (roomsSection) {
          roomsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); 
    }
  };

  return (
    <div>
        <nav className='flex justify-between p-8 bg-black text-white items-center'>
            <Link to='/'>
              <div>
                  <h2 className='font-bold text-2xl uppercase'>DELUXE <span className='text-lime-400 uppercase'>HOTEL</span></h2>
              </div>
            </Link>
            <div>
                <ul className='flex justify-between gap-8'>
                   
                    <li className='font-bold text-lg cursor-pointer hover:text-lime-500 transition-colors'>BOOKINGS</li>
                   
                    <li 
                      onClick={handleRoomsClick}
                      className='font-bold text-lg cursor-pointer hover:text-lime-500 transition-colors'
                    >
                      ROOMS
                    </li>
                    
                    <li className='font-bold text-lg cursor-pointer hover:text-lime-500 transition-colors'>CONTACT</li>
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default Navbar;