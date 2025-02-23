import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaAmbulance, FaUserMd, FaSignOutAlt, FaSun, FaMoon, FaBars } from "react-icons/fa";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [user, setUser] = useState(() => {
        // ✅ Get user from localStorage on first render
        return JSON.parse(localStorage.getItem("user")) || null;
    });

    const toggleDarkMode = () => setDarkMode(!darkMode);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    // ✅ Listen for localStorage updates (when user logs in)
    useEffect(() => {
        const updateUser = () => {
            setUser(JSON.parse(localStorage.getItem("user")));
        };
        window.addEventListener("storage", updateUser);
        return () => window.removeEventListener("storage", updateUser);
    }, []);
    const handleLogout = () => {
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("storage")); // ✅ Notify Navbar
    };

    return (
        <nav className={`navbar ${darkMode ? "dark-mode" : ""}`}>
            <div className="logo">
                <img src="./dp2.png" alt="PetVet Logo" /> PetVet
            </div>

            <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
                <li><Link to="/"><FaHome /> Home</Link></li>
                <li><a href="/Emergency.html"><FaAmbulance /> Emergency Care</a></li>

                <li><Link to="/cattle">Symptom Diagnose</Link></li>
                <li><Link to="/healthguide">Health Guide</Link></li>
                <li><Link to="/appointment"><FaUserMd /> Our Doctors</Link></li>

                {user ? (
                    <>
                        {user.role === "patient" && (
                            <li><Link to="/messages">Messages</Link></li>
                        )}
                        <li>
                            <button onClick={handleLogout} className="logout-btn">
                                <FaSignOutAlt /> Logout {user.name}
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="dropdown">
                            <a href="#" className="login-btn">Login</a>
                            <ul className="dropdown-menu">
                                <li><Link to="/login">Login as Pet Owner</Link></li>
                                <li><Link to="/doctor/register">Register as PetVet</Link></li>
                            </ul>
                        </li>
                        <li><Link to="/Doclogin" className="login-btn">Login as Doctor</Link></li>
                    </>
                )}
            </ul>

            <div className="right-icons">
                <button className="dark-mode-toggle" onClick={toggleDarkMode}>
                    {darkMode ? <FaSun /> : <FaMoon />}
                </button>
                <div className="menu-toggle" onClick={toggleMenu}>
                    <FaBars />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
