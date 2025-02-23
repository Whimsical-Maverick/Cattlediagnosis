import mongoose from "mongoose";
import Doctor from "./doctordb.js";
const AppointmentSchema = new mongoose.Schema({
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    date: String,
    time: String,
    patientName: String,
    phone: String,
    vaccin: String,
    docterId: String,
    patientId: String,
});
const Appoint = mongoose.model('Appoint', AppointmentSchema)
export default Appoint

