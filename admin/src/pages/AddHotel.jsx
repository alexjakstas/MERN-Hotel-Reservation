import { useState } from 'react';
import default_img from "../assets/default_img.png";
import axios from 'axios';
import { backendUrl } from '../App';

const AddHotel = ({token}) => {
  const [image, setImage] = useState(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")

  const roomSubmission = async (e) => {
    e.preventDefault()
    
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      if(image) formData.append("image", image)

        const response = await axios.post(`${backendUrl}/api/hotel/add`, formData, {headers: {token}})

        if(response.data.success){
          console.log(response.data.message)
          setName('')
          setDescription('')
          setPrice('')
          setImage(null)

        } else{
          console.log(response.data.message)
        }

    } catch (error) {
      console.log(error)
      
    }
  }

  return (
    <div>
      <form className='flex flex-col items-start gap-1' onSubmit={roomSubmission}>
        <div>
          <p>Uploade Image</p>
          <div>
            <label htmlFor="image">
              <img src={!image  ? default_img : URL.createObjectURL(image)} alt=""  className="w-32 h-32 object-cover cursor-pointer"/>
              <input type="file" id='image' onChange={(e) => setImage(e.target.files[0])} hidden/>
            </label>

          </div>
        </div>
        <div className='w-full'>
          <p className='mb-2 text-[22px]'>Room Name</p>
          <input type="text" placeholder='Enter room name' value={name} onChange={(e) => setName(e.target.value)} className='w-full max-w-125 p-4 border border-gray-300 rounded-2xl'/>
        </div>

        <div className='w-full'>
          <p className='mb-2 text-[22px]'>Room Description</p>
          <input type="text" placeholder='Enter room description' className='w-full max-w-125 p-4 border border-gray-300 rounded-2xl' value={description} onChange={(e) => setDescription(e.target.value)}/>
        </div>

        <div className='w-full'>
          <p className='mb-2 text-[22px]'>Price</p>
          <input type="number" placeholder='40' className='w-full max-w-125 p-4 border border-gray-300 rounded-2xl' value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>

        <button type='submit' className='mt-6 px-20 py-3 bg-fuchsia-800 rounded-2xl text-white'>
          Add Room
        </button>
      </form>
    </div>
  )
}

export default AddHotel