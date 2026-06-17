import bgImage from '../assets/hero2.jpg'

const Hero = () => {

 
  const scrollToRooms = () => {
    const roomsSection = document.getElementById('rooms-selection');
    if (roomsSection) {
      roomsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='relative h-screen w-full bg-cover bg-no-repeat' style={{ backgroundImage: `url(${bgImage})` }}>
      <div className='absolute inset-0 bg-gray-900 opacity-30 z-10'></div>
      <div className='relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4'>
        <h2 className='text-lg mb-4 tracking-widest uppercase'>Where Luxury Meets Diner</h2>
        <h1 className='text-4xl font-bold mb-6 uppercase'>DELUXE HOTEL</h1>
        
        <button 
          onClick={scrollToRooms}
          className='bg-lime-500 text-black font-bold py-3 px-6 rounded-lg hover:bg-lime-600 transition cursor-pointer'
        >
          BOOK YOUR STAY
        </button>
      </div>
    </div>
  )
}

export default Hero