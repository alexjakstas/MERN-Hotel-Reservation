import { useEffect, useState } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import {
  FaConciergeBell,
  FaSwimmingPool,
  FaTv,
  FaUtensils,
  FaWifi,
} from "react-icons/fa"; 
import axios from "axios";
import { backendUrl } from "../App";

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null); 
  
  const [formData, setFormData] = useState({
    roomName: "",
    roomId: "",
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "1"
  });

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try { 
        const response = await axios.get(`${backendUrl}/api/hotel/rooms/${id}`);

        if (response.data.success) {
          const hotelData = response.data.hotel || response.data.hotels; 
          
          setRoom(hotelData);
          setFormData(prev => ({
            ...prev,
            roomName: hotelData.name,
            roomId: hotelData._id
          }));
        }
      } catch (error) {
        console.log("Klaida gaunant kambario duomenis:", error);
      }
    };

    fetchRoomDetails(); 
  }, [id]); 

 
  const handleBooking = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${backendUrl}/api/reservation/create`, formData);

      if (response.data.success) {
        alert("Reservation successful! Check your email or status.");
        navigate('/'); 
      } else {
        alert(response.data.message || "Reservation failed.");
      }
    } catch (error) {
      console.log("Klaida siunčiant rezervaciją:", error);
      alert("Error processing reservation. Please try again.");
    }
  };

  if (!room) {
    return <div className="text-center p-10 font-bold">Kraunama kambario informacija...</div>;
  }

  return (
    <div className="mx-auto max-w-7xl p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Image */}
      <div className="md:col-span-2 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{room.name}</h1>
          <p className="text-xl text-lime-500 mt-1">${room.price}</p>
        </div>
       
        <img src={`${backendUrl}/uploads/${room.image}`} alt={room.name} className="w-full rounded-lg shadow-md" />
        
        <div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Amenities</h2>
            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <div className="flex items-center gap-2"><FaWifi /> Wi-Fi</div>
              <div className="flex items-center gap-2"><FaTv /> Cable TV</div>
              <div className="flex items-center gap-2"><FaUtensils /> Restaurants</div>
              <div className="flex items-center gap-2"><FaSwimmingPool /> Pool</div>
              <div className="flex items-center gap-2"><FaConciergeBell /> Room Service</div>
            </div>
          </div>

          <div className="mt-4 bg-gray-100 w-full rounded-lg shadow-md py-6 px-4">
            <h2 className="text-lg font-semibold mb-2 ">Room Description</h2>
            <p className="text-gray-600">{room.description}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white p-6 mt-18 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Book Your Stay</h2>
        
        <form className="space-y-4" onSubmit={handleBooking}>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="Name" 
            className="w-full border border-gray-300 p-3 rounded-lg" 
            required 
          />
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="Email" 
            className="w-full border border-gray-300 p-3 rounded-lg" 
            required 
          />
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            placeholder="Phone Number" 
            className="w-full border border-gray-300 p-3 rounded-lg" 
            required 
          />
          
          <div>
            <label className="font-bold">Check-in</label>
            <input 
              type="date" 
              name="checkIn"
              value={formData.checkIn}
              onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
              className="w-full border border-gray-300 p-3 rounded-lg" 
              required 
            />
          </div>
          <div>
            <label className="font-bold">Check-Out</label>
            <input 
              type="date" 
              name="checkOut"
              value={formData.checkOut}
              onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
              className="w-full border border-gray-300 p-3 rounded-lg" 
              required 
            />
          </div>
          <div>
            <label className="font-bold">Number of Guests</label>
            <select 
              name="guests"
              value={formData.guests}
              onChange={(e) => setFormData({...formData, guests: e.target.value})}
              className="w-full p-3 mb-3 border rounded-lg focus:ring focus:ring-blue-300"
            >
              {[...Array(4).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>{i + 1} Guest(s)</option>
              ))}
            </select>
          </div>
          
          <button type="submit" className="w-full bg-lime-400 p-3 text-white rounded-lg hover:bg-lime-300 transition cursor-pointer">
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default HotelDetails;