import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Bookdoc = () => {
    const navigate = useNavigate()
    const [doctor, setDoctor] = useState([])
    const fetchdoc = async () => {
        const data = await fetch('http://localhost:5000/get/doctors')
        const result = await data.json()
        setDoctor(result)
    }
    useEffect(() => {
        fetchdoc()
    }, [])
    const handleBookAppointment = (doctor) => {
        navigate("/appointreg", { state: { doctor } });
    };
    return (
        <div className="doctor">
            <h2 className="doctor-title">Meet Our Expert Doctors</h2>
            <div className="doctor-grid">
                {doctor.map((items, index) => (
                    <div key={index} className="doctor-card">

                        <h3 className="doctor-name">Dr. {items.name}</h3>
                        <p className="doctor-info"><strong>Specialization:</strong> {items.specialization}</p>
                        <p className="doctor-info"><strong>Qualifications:</strong> {items.qualifications}</p>
                        <p className="doctor-info"><strong>Hospital:</strong> {items.hospital_name}</p>
                        <button className="doctor-btn" onClick={() => handleBookAppointment(items)}>Book Appointment</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Bookdoc