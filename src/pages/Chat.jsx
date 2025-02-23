import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Chat = () => {
    const nav = useNavigate();
    const [patients, setPatients] = useState([]);
    const doctor = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!doctor) {
            nav("/Doclogin");
            return;
        }

        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/a?id=${doctor.id}`);
                const data = await response.json();
                setPatients(data);
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        };

        fetchData();
    }, [doctor, nav]);

    return (
        <div className="t">
            <h1 className="u">💬 Chat with Patients</h1>
            {patients.length === 0 ? (
                <p className="v">No appointments yet.</p>
            ) : (
                <div className="w">
                    {patients.map((patient, index) => (
                        <div key={index} className="w1">
                            <div className="w2">
                                <p className="w3">👤 {patient.patientName}</p>
                                <p className="w4">📞 {patient.phone}</p>

                            </div>
                            <button className="w5" onClick={() => nav(`/chat/${patient.patientId}`)}>💬 Chat</button>

                        </div>
                    ))}

                </div>
            )}
            <button onClick={() => nav("/doctor/dashboard")} className="w6">Back</button>
        </div>
    );
};

export default Chat;
