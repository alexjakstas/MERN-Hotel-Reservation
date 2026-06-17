/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { roomData } from "../assets/asset";
import { backendUrl } from "../App";
import axios from "axios"

export const RoomContext = createContext();

const RoomContextProvider = ({ children }) => {
  const [rooms, setRooms] = useState(roomData);

 

  useEffect(()=>{ const fetchHotelRoom = async () =>{
    try {
      const response = await axios .get(`${backendUrl}/api/hotel/list`)
      if(response.data.success){
        setRooms(response.data.hotels)
      } else{
        console.log(response.data.message);
        
      }
    } catch (error) {
      console.log(error);
      
    }
  }
    fetchHotelRoom()
  },[])

  return (
    <RoomContext.Provider value={{ rooms }}>{children}</RoomContext.Provider>
  );
};

export default RoomContextProvider;
