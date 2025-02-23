import { useState } from "react"
import { useNavigate } from "react-router-dom"
const Login = () => {
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
        setError("");
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/login/owner", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            // ✅ Store user in localStorage
            localStorage.setItem("user", JSON.stringify({
                id: data.id,
                name: data.name,
                role: "patient" // ✅ Ensure correct role
            }));

            // ✅ Force Navbar to update
            window.dispatchEvent(new Event("storage"));

            // ✅ Redirect to home or messages page
            setDone(true);
            setTimeout(() => {
                nav("/");
            }, 1000);
            console.log("MongoDB _id:", data.id);

        } catch (error) {
            setDone(false);
            setError(error.message);
            console.log("Error submitting form:", error.message);
        }

        console.log("Stored User:", localStorage.getItem("user"));
    };


    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Login</h1>
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
                        <button className="new_btn" onClick={() => nav("/register")}>Sign Up</button>
                    </div>
                </form>

                {done && (
                    <div className="overlay">
                        <div className="success-message">
                            <p>✅ You are successfully logged in!</p>
                            <button className="home-btn" onClick={() => nav("/")}>Go to Home Page</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Login