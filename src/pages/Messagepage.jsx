import { useEffect, useState } from "react";

const Messages = () => {
    const [doctors, setDoctors] = useState([]);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const patientId = storedUser?.id;

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch(`http://localhost:5000/get/patient-doctors/${patientId}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error);
                }
                setDoctors(data.doctors);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };

        if (patientId) {
            fetchDoctors();
        }
    }, [patientId]);

    return (
        <div className="messages-container">
            <h2>Your Doctors</h2>
            {doctors.length > 0 ? (
                <ul>
                    {doctors.map((doctor) => (
                        <li key={doctor._id}>
                            <a href={`/chatting/${doctor._id}`}>💬 Chat with Dr. {doctor.name}</a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No doctors found. Book an appointment first.</p>
            )}
        </div>
    );
};

export default Messages;
