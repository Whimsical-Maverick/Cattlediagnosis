import { useState } from "react"
import { useNavigate } from "react-router-dom"
const Doclogin = () => {
    const nav = useNavigate()
    const [form, setForm] = useState({ "email": "", "password": "" })
    const [done, setDone] = useState(false)
    const [error, setError] = useState("")
    const Handlechange = (e) => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value
        })
    }
    const Handlesubmit = async (e) => {
        setError("")
        e.preventDefault()
        try {
            const data = await fetch("http://localhost:5000/login/doctor", {
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
            localStorage.setItem("user", JSON.stringify(final.user));

        } catch (error) {
            setDone(false)
            setError(error.message)
            console.log("Error submitting form")
        }


    }

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Login Doctor sahab</h1>
                {error && <p className="error-message">❌ {error}</p>}
                <form onSubmit={Handlesubmit}>
                    <div className="input-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            placeholder="Enter your email"
                            onChange={Handlechange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            placeholder="Enter your password"
                            onChange={Handlechange}
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                    <div className="new">
                        <p>Not Registered</p>
                        <button className="new_btn" onClick={() => nav("/doctor/register")}>Sign Up</button>
                    </div>
                </form>

                {done && (
                    <div className="overlay">
                        <div className="success-message">
                            <p>✅ You are successfully logged in!</p>
                            <button className="home-btn" onClick={() => nav("/doctor/dashboard")}>Go to your dashboard</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Doclogin