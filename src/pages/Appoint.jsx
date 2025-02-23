import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";

const Appoint = () => {
    const nav = useNavigate()
    const location = useLocation();
    const doctor = location.state?.doctor;
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const patientid = storedUser?.id;
    const [done, setDone] = useState(false)
    const [form, setForm] = useState({
        date: "",
        time: "",
        patientName: storedUser?.name,
        phone: "",
        vaccin: null,
        doctorId: doctor._id,
        patientId: patientid
    });

    if (!doctor) {
        return <h2>No Doctor Selected</h2>;
    }
    const handleChange = (e) => {
        const { name, value, type, files } = e.target
        if (type === "file") {
            setForm({
                ...form,
                [name]: files[0] // Store file object
            });
        } else {
            setForm({
                ...form,
                [name]: value
            });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const formData = new FormData();
            Object.keys(form).forEach((key) => {
                formData.append(key, form[key]);
            });

            const data = await fetch("http://localhost:5000/get/appointment", {
                method: 'POST',
                body: formData
            });

            const final = await data.json();
            if (!data.ok) {
                throw new Error(final.error);
            }
            setDone(true);

        } catch (error) {
            setDone(false);

            console.log("Error submitting form");
        }
    };
    return (
        <div className="appointment-container">
            <h2>Book an Appointment with Dr. {doctor.name}</h2>
            <p><strong>Specialization:</strong> {doctor.specialization}</p>
            <p><strong>Qualifications:</strong> {doctor.qualifications}</p>
            <p><strong>Hospital:</strong> {doctor.hospital_name}</p>

            <form onSubmit={handleSubmit}>
                <h2>{storedUser?.name} book your pet's appointment</h2>
                <label>Choose Date:</label>
                <input type="date" name="date" required onChange={handleChange} />

                <label>Choose Time:</label>
                <input type="time" name="time" required onChange={handleChange} />



                <label>Contact Number:</label>
                <input type="text" name="phone" required onChange={handleChange} />
                <div className="form-group">
                    <label>Upload Vaccination certificate</label>
                    <input type="file" name="vaccin" accept=".pdf" onChange={handleChange} />
                </div>

                <button type="submit">Confirm Appointment</button>
            </form>
            {done && (
                <div className="overlay">
                    <div className="success-message">
                        <p>✅ Your Appointment is done!</p>
                        <button className="home-btn" onClick={() => nav("/")}>Go to Home Page</button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Appoint