import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
    licenseNumber: { type: String, required: true, unique: true },

    qualifications: { type: String, required: true },
    password: { type: String, required: true },
    hospital_name: { type: String, required: true },
    address: { type: String, required: true }
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor