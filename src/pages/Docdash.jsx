import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Docnav from "../component/Docnav";

const Docdash = () => {
    const nav = useNavigate();
    const [doctor, setDoctor] = useState({});
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("user"));
        if (storedData) {
            setDoctor(storedData);
            fetchAppointments(storedData.id);
        }
    }, []);

    const fetchAppointments = async (doctorId) => {
        try {
            const response = await fetch(`http://localhost:5000/a?id=${doctorId}`);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Error fetching appointments");
            }
            setAppointments(data);
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };

    return (
        <div className="dashboard-layout">
            <Docnav />

            <div className="dashboard-container">
                <h1 className="dashboard-title">Welcome, Dr. {doctor.name}</h1>

                <h2 className="section-title">📅 Appointments</h2>

                {appointments.length > 0 ? (
                    <div className="appointments-grid">
                        {appointments.map((appt) => (
                            <div key={appt._id} className="appointment-card">
                                <p className="patient-name">👤 Patient: <span>{appt.patientName}</span></p>
                                <p>📅 <strong>Date:</strong> {appt.date}</p>
                                <p>⏰ <strong>Time:</strong> {appt.time}</p>
                                <p>📞 <strong>Contact:</strong> {appt.phone}</p>
                                {appt.vaccin ? (
                                    <p className="vaccination">
                                        💉 <strong>Vaccination Certificate:</strong>
                                        <a href={`http://localhost:5000${appt.vaccin}`} target="_blank" rel="noopener noreferrer">View Certificate</a>
                                    </p>
                                ) : (
                                    <p className="no-vaccination">🚫 No Vaccination Certificate Uploaded</p>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-appointments">No Appointments Found.</p>
                )}
            </div>
        </div>
    );
};

export default Docdash;
