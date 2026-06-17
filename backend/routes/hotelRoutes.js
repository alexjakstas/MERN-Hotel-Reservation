import express from 'express'
import {addHotel, listHotel, removeHotel, singleHotel, updateHotel} from '../controllers/hotelControllers.js'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js'

const hotelRouter = express.Router()

hotelRouter.post('/add',adminAuth, upload.single("image"), addHotel)
hotelRouter.post('/update', adminAuth, upload.single("image"), updateHotel);
hotelRouter.get('/list', listHotel)
hotelRouter.post('/remove', adminAuth, removeHotel)
hotelRouter.get('/rooms/:id', singleHotel)


export default hotelRouter