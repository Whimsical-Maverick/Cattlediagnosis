import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Register = () => {
    const nav = useNavigate()
    const [form, setForm] = useState({ "username": "", "email": "", "contact": "", "street": "", "state": "", "country": "", "zip": "", "password": "", "pet_name": "", "pet_species": "", "weight": "", "vaccin_certificate": null })
    const [done, setDone] = useState(false)
    const [error, setError] = useState("")
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
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const formData = new FormData();
            Object.keys(form).forEach((key) => {
                formData.append(key, form[key]);
            });

            const data = await fetch("http://localhost:5000/register/owner", {
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
            setError(error.message);
            console.log("Error submitting form");
        }
    };

    return (
        <div className="form-container">
            <h2>Register Your Pet</h2>
            {error && <p className="error-message">❌ {error}</p>}
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input type="text" name="contact" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Street</label>
                    <input type="text" name="street" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>State</label>
                    <input type="text" name="state" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Country</label>
                    <input type="text" name="country" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Zip Code</label>
                    <input type="text" name="zip" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Pet Name</label>
                    <input type="text" name="pet_name" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Pet Species</label>
                    <select name="pet_species" onChange={handleChange} required value={form.pet_species}>
                        <option value="" disabled>Select Pet Species</option>
                        <option value="Dog">Dog</option>
                        <option value="Cattle">Cattle</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Pet Weight (kg)</label>
                    <input type="text" name="weight" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Upload Vaccination certificate</label>
                    <input type="file" name="vaccin_certificate" accept=".pdf" onChange={handleChange} />
                </div>
                <button type="submit" className="submit-btn">Submit</button>
            </form>

            {done && (
                <div className="overlay">
                    <div className="success-message">
                        <p>✅ You are successfully Registered!</p>
                        <button className="home-btn" onClick={() => nav("/login")}>Now Login</button>
                    </div>
                </div>
            )}
        </div>
    )


}
export default Register