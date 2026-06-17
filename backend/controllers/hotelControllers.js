import hotelModel from "../models/hotelModel.js";
import mongoose from "mongoose";
import {v2 as cloudinary} from 'cloudinary'

const addHotel = async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const image = req.file;
 
        const imageUrl = image ? image.filename : "default_img.png";

        const hotelData = {
            name, 
            description, 
            price: Number(price),
            image: imageUrl, // Duomenų bazėje saugome kelią iki failo
            date: Date.now()
        }

        const hotel = new hotelModel(hotelData)
        await hotel.save()

        res.json({ success: true, message: "Hotel room added successfully!" })

    } catch (error) {
        console.log("=== API KLAIDOS DETALĖS ===");
        console.error(error);
        console.log("===========================");
        res.json({ success: false, message: "Error adding hotel room" })
    }
}

const listHotel = async (req, res) => {
    try{
        const hotels = await hotelModel.find({})
        res.json({success:true, hotels})
    } catch (error){
        console.log(error);
        res.json({success:false, message: "Error listing hotel room"})
    }
}

const removeHotel = async (req, res) => {
    try{
        await hotelModel.findByIdAndDelete(req.body._id)

        res.json({success:true, message: 'Hotel room removed succesfully!'})
    } catch (error){
        console.log(error);
        res.json({success:false, message: "Error deleting hotel room"})
    }
}

const singleHotel = async (req, res) => {
    try {
        const hotel = await hotelModel.findById(req.params.id)
        if (!hotel) return res.json({ success: false, message: "Room not found" })
         
        res.json({ success: true, hotel }) 
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching specific hotel room" })
    }
}
const updateHotel = async (req, res) => {
    try {
        const { id, name, price, description } = req.body;
        
        // Paruošiame objektą su atnaujintais duomenimis
        const updateData = {
            name,
            description,
            price: Number(price)
        };

        // Jei vartotojas redaguodamas prisegė naują nuotrauką, atnaujiname ir ją
        if (req.file) {
            updateData.image = req.file.filename;
        }

        // Surandame kambarį pagal ID ir atnaujiname jo laukus
        const updatedRoom = await hotelModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedRoom) {
            return res.json({ success: false, message: "Kambarys nerastas" });
        }

        res.json({ success: true, message: "Kambarys sėkmingai atnaujintas!", hotel: updatedRoom });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Klaida redaguojant kambarį" });
    }
};

export {addHotel, listHotel, removeHotel, singleHotel, updateHotel}