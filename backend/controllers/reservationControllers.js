import reservationModels from "../models/reservationModels.js"

const createReservation = async (req, res) => {
    try {
      
        const { name, email, phone, checkIn, checkOut, guests, roomName, roomId } = req.body

      
        if (!name || !email || !phone || !checkIn || !checkOut || !guests || !roomName || !roomId) {
            return res.json({ success: false, message: "All fields are required" })
        }

        const newReservation = new reservationModels({
            name,
            email,
            phone,
            checkin: checkIn,   
            checkout: checkOut, 
            guests,
            roomName,
            roomId
        })

        await newReservation.save();

        res.json({ success: true, message: "Reservation created successfully!", reservation: newReservation })
        
    } catch (error) {
        console.log("=== REZERVACIJOS KLAIDA ===");
        console.log(error);
        console.log("===========================");
        res.json({ success: false, message: "Error creating reservation!" })
    }
}

const getAllReservation = async (req, res) => {
    try {
        const reservations = await reservationModels.find()
        res.json({ success: true, reservations }) 
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching reservation!" })
    }
}

const deleteReservation = async (req, res) => {
    try {
        const { id } = req.params
        await reservationModels.findByIdAndDelete(id)
        res.json({ success: true, message: "Reservation deleted successfully!" }) 
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error deleting reservation!" })
    }
}

const updateReservation = async (req, res) => {
    try {
        const { id, name, email, phone, checkIn, checkOut, guests, roomName } = req.body;

      
        const updateData = {
            name,
            email,
            phone,
            checkin: checkIn,  
            checkout: checkOut, 
            guests: Number(guests),
            roomName
        };

        const updatedReservation = await reservationModels.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedReservation) {
            return res.json({ success: false, message: "Rezervacija nerasta" });
        }

        res.json({ success: true, message: "Rezervacija sėkmingai atnaujinta!", reservation: updatedReservation });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Klaida atnaujinant rezervaciją" });
    }
};

export { createReservation, getAllReservation, deleteReservation, updateReservation }