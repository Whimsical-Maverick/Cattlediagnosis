import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const Change = () => {
    const nav = useNavigate()
    const { doctorId } = useParams()
    const [info, setInfo] = useState({
        name: "",
        password: "",
        email: "",
        phone: "",
        specialization: "",
        qualifications: "",
        hospital_name: "",
        address: ""
    })
    const [err, setErr] = useState("")
    const [done, setDone] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:5000/changeset/${doctorId}`);
                const data = await res.json();
                if (data.error) {
                    setErr(data.error);
                } else {
                    // Ensure we merge fetched data with the existing structure
                    setInfo((prevInfo) => ({
                        ...prevInfo,
                        ...data
                    }));
                }
            } catch (error) {
                setErr("Failed to fetch data.");
            }
        };

        fetchData();
    }, [doctorId]);


    const handleSubmit = async () => {
        try {
            const res = await fetch(`http://localhost:5000/update/doctor/${doctorId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(info)
            });

            const data = await res.json();
            if (data.error) {
                setErr(data.error);
            } else {
                setDone(true)
            }
        } catch (error) {
            setErr("Failed to update profile.");
        }
    }
    return (
        <div className="change-container">
            {err && <p className="error">{err}</p>}
            <h2>Update Profile</h2>
            <div className="form-group">
                <label>Change Username:</label>
                <input type="text" value={info.name || ""} onChange={(e) => setInfo({ ...info, name: e.target.value })} />
            </div>
            <div className="form-group">
                <label>Change Password:</label>
                <input type="password" value={info.password || ""} onChange={(e) => setInfo({ ...info, password: e.target.value })} />
            </div>
            <div className="form-group">
                <label>Change Email:</label>
                <input type="email" value={info.email || ""} onChange={(e) => setInfo({ ...info, email: e.target.value })} />
            </div>
            <div className="form-group">
                <label>Change Contact No:</label>
                <input type="text" value={info.phone || ""} onChange={(e) => setInfo({ ...info, phone: e.target.value })} />
            </div>
            <div className="form-group">
                <label>Change Specialization:</label>
                <input type="text" value={info.specialization || ""} onChange={(e) => setInfo({ ...info, specialization: e.target.value })} />
            </div>
            <div className="form-group">
                <label>Change Qualifications:</label>
                <input type="text" value={info.qualifications || ""} onChange={(e) => setInfo({ ...info, qualifications: e.target.value })} />
            </div>
            <div className="form-group">
                <label>Change Hospital of Residence:</label>
                <input type="text" value={info.hospital_name || ""} onChange={(e) => setInfo({ ...info, hospital_name: e.target.value })} />
            </div>
            <div className="form-group">
                <label>Change Address of the Hospital:</label>
                <input type="text" value={info.address || ""} onChange={(e) => setInfo({ ...info, address: e.target.value })} />
            </div>
            <button className="submit-btn" onClick={handleSubmit}>Save Changes</button>

            {done && (
                <div className="success-message">
                    <p>Your profile has been updated!</p>
                    <button className="dashboard-btn" onClick={() => nav("/doctor/dashboard")}>Go to Dashboard</button>
                </div>
            )}
        </div>
    )
}
export default Change