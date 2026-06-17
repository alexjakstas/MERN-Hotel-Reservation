import axios from 'axios'
import { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import { MdDeleteForever, MdEdit } from "react-icons/md";

const Reservation = () => {
  const [reservaions, setReservations] = useState([])

  
  const [editingReservation, setEditingReservation] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editGuests, setEditGuests] = useState('1');
  const [editCheckIn, setEditCheckIn] = useState('');
  const [editCheckOut, setEditCheckOut] = useState('');
  const [editRoomName, setEditRoomName] = useState('');

  const fetchReservation = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/reservation/get')
      if (response.data.success) {
        setReservations(response.data.reservations)
      } else {
        setReservations(Array.isArray(response.data) ? response.data : [])
      }
    } catch (error) {
      console.log("Klaida užkraunant rezervacijas:", error)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Ar tikrai norite ištrinti šią rezervaciją?")) return;
    try {
      const response = await axios.delete(`${backendUrl}/api/reservation/delete/${id}`)
      if (response.data.success) {
        alert("Ištrinta sėkmingai!");
        setReservations(prev => prev.filter(res => res._id !== id))
      }
    } catch (error) {
      console.log("Klaida trinant rezervaciją:", error)
    }
  }

  
  const startEdit = (res) => {
    setEditingReservation(res);
    setEditName(res.name);
    setEditEmail(res.email);
    setEditPhone(res.phone);
    setEditGuests(res.guests);
    setEditRoomName(res.roomName);
    setEditCheckIn(res.checkin ? res.checkin.substring(0, 10) : (res.checkIn ? res.checkIn.substring(0, 10) : ''));
    setEditCheckOut(res.checkout ? res.checkout.substring(0, 10) : (res.checkOut ? res.checkOut.substring(0, 10) : ''));
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/reservation/update`, {
        id: editingReservation._id,
        name: editName,
        email: editEmail,
        phone: editPhone,
        guests: editGuests,
        checkIn: editCheckIn,
        checkOut: editCheckOut,
        roomName: editRoomName
      });

      if (response.data.success) {
        alert("Rezervacija sėkmingai atnaujinta!");
        setEditingReservation(null); 
        fetchReservation(); 
      } else {
        alert("Nepavyko atnaujinti: " + response.data.message);
      }
    } catch (error) {
      console.log("Error reservation edit", error);
    }
  }

  useEffect(() => {
    fetchReservation()
  }, [])

  return (
    <div className='min-h-screen p-6 relative'>
      <h2 className='text-3xl font-bold text-gray-700 text-center mb-6'>Room Reservations</h2>
      
      <div className='overflow-x-auto'>
        <table className='w-full shadow-lg rounded-2xl border-collapse bg-white'>
          <thead>
            <tr className='bg-fuchsia-800 text-left text-white'>
              <th className='p-3'>Room Name</th>
              <th className='p-3'>Name</th>
              <th className='p-3'>Email</th>
              <th className='p-3'>Phone</th>
              <th className='p-3 text-center'>Guests</th>
              <th className='p-3'>Check-in</th>
              <th className='p-3'>Check-out</th>
              <th className='p-3 text-center'>Edit</th> 
              <th className='p-3 text-center'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {reservaions.length === 0 ? (
              <tr>
                <td colSpan="9" className='p-4 text-center text-gray-500'>No Reservation available</td>
              </tr>
            ) : (
              reservaions.map((res, index) => (
                <tr key={index} className='border-b hover:bg-gray-100 transition-colors'>
                  <td className='p-3 font-semibold'>{res.roomName}</td>
                  <td className='p-3'>{res.name}</td>
                  <td className='p-3'>{res.email}</td>
                  <td className='p-3'>{res.phone}</td>
                  <td className='p-3 text-center'>{res.guests}</td>
                  <td className='p-3'>{res.checkin || res.checkIn}</td>
                  <td className='p-3'>{res.checkout || res.checkOut}</td>
                  
                  {/* Reservation update */}
                  <td className='p-3 text-center'>
                    <MdEdit 
                      onClick={() => startEdit(res)}
                      className='mx-auto text-[22px] cursor-pointer text-blue-600 hover:text-blue-800 transition-colors'
                    />
                  </td>

                  <td className='p-3 text-center'>
                    <button 
                      onClick={() => handleDelete(res._id)}
                      className='bg-red-500 text-white px-3 py-1.5 rounded-xl hover:bg-red-600 flex items-center gap-1 mx-auto cursor-pointer transition-colors'
                    >
                      <MdDeleteForever className="text-lg" /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Reservation update */}
      {editingReservation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 text-fuchsia-700">Edit Reservation</h3>
            <form onSubmit={handleUpdate} className="flex flex-col gap-3">
              
              <label className="text-sm font-semibold">Client Name:</label>
              <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="border p-2 rounded" required />

              <label className="text-sm font-semibold">Email:</label>
              <input type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="border p-2 rounded" required />

              <label className="text-sm font-semibold">Phone:</label>
              <input type="text" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} className="border p-2 rounded" required />

              <label className="text-sm font-semibold">Room Name:</label>
              <input type="text" value={editRoomName} onChange={(e) => setEditRoomName(e.target.value)} className="border p-2 rounded" required />

              <label className="text-sm font-semibold">Guests:</label>
              <select value={editGuests} onChange={(e) => setEditGuests(e.target.value)} className="border p-2 rounded">
                {[1, 2, 3, 4].map(num => (
                  <option key={num} value={num}>{num} Guest(s)</option>
                ))}
              </select>

              <label className="text-sm font-semibold">Check-in Date:</label>
              <input type="date" value={editCheckIn} onChange={(e) => setEditCheckIn(e.target.value)} className="border p-2 rounded" required />

              <label className="text-sm font-semibold">Check-out Date:</label>
              <input type="date" value={editCheckOut} onChange={(e) => setEditCheckOut(e.target.value)} className="border p-2 rounded" required />

              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setEditingReservation(null)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
                <button type="submit" className="bg-fuchsia-600 text-white px-4 py-2 rounded hover:bg-fuchsia-700">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Reservation;