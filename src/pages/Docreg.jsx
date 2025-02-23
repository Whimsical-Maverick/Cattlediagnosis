import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Docreg = () => {
    const nav = useNavigate()
    const [form, setForm] = useState({ "name": "", "email": "", "phone": "", "specilization": "", "experience": "", "licenseNumber": "", "qualifications": "", "password": "", "hospital_name": "", "address": "" })
    const [done, setDone] = useState(false)
    const [error, setError] = useState("")
    const HandleChange = (e) => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value
        })

    }

    const HandleSubmit = async (e) => {
        setError("")
        e.preventDefault()
        try {
            const data = await fetch("http://localhost:5000/register/doctor", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form)
            })
            const final = await data.json()
            if (!data.ok) {
                throw new Error(final.error)
            }
            setDone(!done)
        } catch (error) {
            setDone(false)
            setError(error.message)
            console.log("Error submitting form")
        }
    }
    return (
        <div className="form-container" >
            <h2>Help Owners by Registering Yourself</h2>
            {error && <p className="error-message">❌ {error}</p>}
            <form className="register-form" onSubmit={HandleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Enter your name" onChange={HandleChange} />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" placeholder="Enter your email" onChange={HandleChange} />
                </div>
                <div className="form-group">
                    <label>Contact No.</label>
                    <input type="text" name="phone" placeholder="Enter your phone number" onChange={HandleChange} />
                </div>
                <div className="form-group">
                    <label>Specialization</label>
                    <input type="text" name="specialization" placeholder="Your expertise" onChange={HandleChange} />
                </div>
                <div className="form-group">
                    <label>Experience (Years)</label>
                    <input type="number" name="experience" placeholder="Years of experience" onChange={HandleChange} />
                </div>
                <div className="form-group">
                    <label>License Number</label>
                    <input type="text" name="licenseNumber" placeholder="Your license number" onChange={HandleChange} />
                </div>
                <div className="form-group">
                    <label>Qualifications</label>
                    <input type="text" name="qualifications" placeholder="Your qualifications" onChange={HandleChange} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Choose a strong password" onChange={HandleChange} />
                </div>
                <div className="form-group">
                    <label>Hospital/Clinic</label>
                    <input type="text" name="hospital_name" placeholder="Your hospital/clinic name" onChange={HandleChange} />
                </div>
                <div className="form-group">
                    <label>Address of Hospital/Clinic</label>
                    <input type="text" name="address" placeholder="Your hospital/clinic address" onChange={HandleChange} />
                </div>
                <button type="submit" className="register-btn">Register</button>
            </form>
            {done && (
                <div className="overlay">
                    <div className="success-message">
                        <p>✅ Thank you Dr {form.name} for your registration</p>
                        <button className="home-btn" onClick={() => nav("/")}>Go to Home page</button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Docreg