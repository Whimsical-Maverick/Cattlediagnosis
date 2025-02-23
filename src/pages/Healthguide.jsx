import { useNavigate } from "react-router-dom";

const Healthguide = () => {
    const nav = useNavigate()
    return (
        <div className="health-container">
            <h1>Pet Health Guide</h1>
            <p>Your go-to resource for keeping your furry friends happy and healthy!</p>

            <section className="common-issues">
                <h2>Common Health Issues</h2>
                <ul>
                    <li>🐾 Fever & Infections – Signs: Lethargy, loss of appetite.</li>
                    <li>🐾 Diarrhea & Vomiting – Causes: Food intolerance, infections.</li>
                    <li>🐾 Allergies – Symptoms: Skin rashes, itching, sneezing.</li>
                </ul>
            </section>

            <section className="preventive-care">
                <h2>Preventive Care</h2>
                <ul>
                    <li>✔ Regular vaccinations & deworming.</li>
                    <li>✔ Brush teeth 2-3 times a week to prevent dental issues.</li>
                    <li>✔ Flea & tick control for a healthy coat.</li>
                </ul>
            </section>

            <section className="nutrition">
                <h2>Healthy Nutrition</h2>
                <p>Avoid chocolate, onions, and grapes as they are toxic to pets. Always provide fresh water and a balanced diet.</p>
            </section>

            <section className="exercise">
                <h2>Exercise & Mental Well-being</h2>
                <p>Regular walks and interactive play keep pets physically and mentally fit.</p>
            </section>

            <section className="emergency-care">
                <h2>Emergency First Aid</h2>
                <p>🚑 In case of poisoning or choking, stay calm and rush to the vet immediately.</p>
            </section>

            <section className="contact">
                <h2>Need Help?</h2>
                <p>📞 Call us at (123) 456-7890 for emergencies.</p>
                <button className="btn" onClick={() => nav("/appointment")}>Book an Appointment</button>
            </section>
        </div>
    );
}
export default Healthguide