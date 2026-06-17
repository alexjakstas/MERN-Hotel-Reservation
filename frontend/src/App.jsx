import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import HotelDetails from './pages/HotelDetails'
import Footer from './components/Footer'

export const backendUrl = 'http://localhost:4000'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/room/:id' element={<HotelDetails />} /> 
      </Routes>
      <Footer />
    </div>
  )
}

export default App