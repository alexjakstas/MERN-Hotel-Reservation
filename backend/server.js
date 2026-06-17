import express from "express"
import cors from "cors"
import 'dotenv/config' 
import connectDB from "./config/mongodb.js"
import connectionCloudinary from "./config/cloudinary.js"
import hotelRouter from './routes/hotelRoutes.js'
import reservationRoute from './routes/reservationRoute.js'
import userRouter from "./routes/userRouters.js"


const app = express()

const port = process.env.PORT || 4000

connectDB()
connectionCloudinary()

app.use(cors())
app.use(express.json())

app.use('/uploads', express.static('uploads'))
app.use('/api/hotel', hotelRouter)
app.use('/api/reservation', reservationRoute)
app.use('/api/user', userRouter)

app.get('/', (req, res) =>{
    res.send("API Working")
})

app.listen(port, ()=> console.log('Server started on Port' + port));