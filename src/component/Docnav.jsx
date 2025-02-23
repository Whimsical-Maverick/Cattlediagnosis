import { Link, useNavigate } from "react-router-dom"

const Docnav = () => {
    const nav = useNavigate()
    return (
        <nav className="doc-nav">
            <h2 className="nav-title">👨‍⚕️ Doctor Panel</h2>
            <ul className="nav-list">

                <li><Link to="/appointments">📅 Appointments</Link></li>
                <li><Link to="/patients">🩺 Chat with Patients</Link></li>
                <li><Link to="/profile">⚙️ Profile Settings</Link></li>
                <li><button onClick={() => nav("/")}>🚪 Log Out</button></li>
            </ul>
        </nav>
    )
}
export default Docnav