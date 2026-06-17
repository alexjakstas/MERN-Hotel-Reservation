import axios from 'axios'
import { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import { MdDeleteForever, MdEdit } from "react-icons/md";

const ListHotel = ({ token }) => {
  const [list, setList] = useState([])
  
  
  const [editingRoom, setEditingRoom] = useState(null); 
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editImage, setEditImage] = useState(null);

  const fetchRoomList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/hotel/list')
      if (response.data.success) {
        setList(response.data.hotels)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const removeHotel = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/hotel/remove', { _id: id }, { headers: { token } })
      if (response.data.success) {
        setList(prev => prev.filter(item => item._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  }

  const startEdit = (room) => {
    setEditingRoom(room);
    setEditName(room.name);
    setEditPrice(room.price);
    setEditDescription(room.description);
    setEditImage(null); 
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('id', editingRoom._id);
      formData.append('name', editName);
      formData.append('price', editPrice);
      formData.append('description', editDescription);
      if (editImage) {
        formData.append('image', editImage);
      }

      const response = await axios.post(
        backendUrl + '/api/hotel/update', 
        formData, 
        { headers: { token, 'Content-Type': 'multipart/form-data' } }
      );

      if (response.data.success) {
        alert("Atnaujinta sėkmingai!");
        setEditingRoom(null); 
        fetchRoomList(); 
      }
    } catch (error) {
      console.log("Klaida redaguojant:", error);
    }
  }

  useEffect(() => {
    fetchRoomList();
  }, [token])

  return (
    <div className="relative">
      <p className='mb-2 font-bold text-2xl'>Hotel Rooms List</p>
      
      <div className='flex flex-col gap-2'>
        {/* Antraštė */}
        <div className='grid grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center p-2 border-b-2 border-gray-300 text-lg font-semibold'>
          <b className='text-center'>Image</b>
          <b className='text-center'>Room Name</b>
          <b className='text-center'>Price</b>
          <b className='text-center'>Edit</b>
          <b className='text-center'>Delete</b>
        </div>
        
        {/* Sąrašas */}
        {list.map((item, index) => (
          <div key={index} className='grid grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center p-2 border-b-2 border-gray-300 text-lg'>
            <img src={`${backendUrl}/uploads/${item.image}`} alt="" className='w-12 h-12 object-cover rounded mx-auto' />
            <p className='text-center'>{item.name}</p>
            <p className='text-center'>${item.price}</p> 
            
            {/* Redagavimo mygtukas (Pieštukas) */}
            <MdEdit 
              onClick={() => startEdit(item)} 
              className='mx-auto text-[22px] cursor-pointer text-blue-600 hover:text-blue-800'
            />

            {/* Trynimo mygtukas */}
            <MdDeleteForever  
              onClick={() => removeHotel(item._id)} 
              className='mx-auto text-[24px] cursor-pointer text-red-600 hover:text-red-800'
            />
          </div>
        ))}
      </div>

      
      {editingRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Edit Room Information</h3>
            <form onSubmit={handleUpdate} className="flex flex-col gap-3">
              
              <label className="text-sm font-semibold">Room Name:</label>
              <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="border p-2 rounded" required />

              <label className="text-sm font-semibold">Price ($):</label>
              <input type="number" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} className="border p-2 rounded" required />

              <label className="text-sm font-semibold">Description:</label>
              <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} className="border p-2 rounded h-20" required />

              <label className="text-sm font-semibold">Change Image (Optional):</label>
              <input type="file" onChange={(e) => setEditImage(e.target.files[0])} className="text-sm" />

              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setEditingRoom(null)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ListHotel;