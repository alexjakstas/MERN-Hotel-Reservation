import { useContext } from "react";
import { RoomContext } from "../context/RoomContext";
import { FaUserFriends, FaBed, FaBath, FaWifi } from "react-icons/fa";
import { Link } from "react-router-dom";
import { backendUrl } from "../App"; 

const amenitiesList = [
  { label: "1-2 Persons", icon: <FaUserFriends className="text-gray-600" /> },
  { label: "Bathtub", icon: <FaBath className="text-gray-600" /> },
  { label: "King Size Bed", icon: <FaBed className="text-gray-600" /> },
  { label: "Free Wifi", icon: <FaWifi className="text-gray-600" /> },
];

const HotelList = () => {
  const { rooms } = useContext(RoomContext);

  console.log("rooms", rooms);
  return (
    <div id="rooms-selection" className="bg-[#f7f0eb] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-serif text-center mb-12 text-gray-800">
          Book your stay and <br /> relax in luxury
        </h2>

        <div className="grid grid-cols-2 gap-10 ">
          {rooms && rooms.length > 0 ? (
            rooms.map((room, index) => {
              const roomId = room._id || room.id;
              const { image, name, price } = room;
              const finalImageUrl = image && image.startsWith("http") 
                ? image 
                : `${backendUrl}/uploads/${image}`;

              return (
                <div key={index} className="bg-white shadow rounded-2xl overflow-hidden hover:scale-[1.03] hover:shadow-xl transition-all duration-500 ease-in-out">
                  
                  <Link to={`/room/${roomId}`}>
                    <img src={finalImageUrl} alt={name} className="w-full h-80 object-cover"/>
                  </Link>

                  <div className="p-5">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-1">{name}</h3>
                    <p className="text-gray-600 text-lg mb-4">${price}</p>
                    <div className="grid grid-cols-2 gap-4 text-base text-gray-700">
                      {amenitiesList.map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          {amenity.icon} <span>{amenity.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-center col-span-full">No rooms available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelList;