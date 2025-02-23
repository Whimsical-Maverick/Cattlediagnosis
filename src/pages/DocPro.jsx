import { useState } from "react";
import { useNavigate } from "react-router-dom";


const DocPro = () => {
    const nav = useNavigate();
    const [pass, setPass] = useState("");
    const [err, setErr] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:5000/check/doctor/${pass}`);
            const data = await res.json();
            if (data.error) {
                setErr(data.error);
            } else {
                nav(`/change/${data._id}`);
            }
        } catch (error) {
            setErr("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Change Profile Settings</h2>
                {err && <p className="error">{err}</p>}
                <form onSubmit={handleSubmit}>
                    <label>Enter your current password:</label>
                    <input
                        type="password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        placeholder="••••••••"
                        required
                    />
                    <button type="submit" disabled={!pass}>
                        Change Profile Settings
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DocPro;
