import { useNavigate } from "react-router-dom";

const Aboutus = () => {
    const nav = useNavigate()
    return (
        <div className="about-container">
            <h1>About PetVet</h1>
            <p>Welcome to <strong>PetVet</strong>, where we provide the best care for your furry friends.</p>

            <section className="our-story">
                <h2>Our Story</h2>
                <p>PetVet was built with love for pets and a mission to provide top-notch veterinary care. Our experienced team ensures that every pet receives personalized treatment.</p>
            </section>

            <section className="team">
                <h2>Meet Our Team</h2>
                <p>Our expert veterinarians and staff are passionate about keeping pets healthy and happy.</p>
                <ul>
                    <li>🐾 Dr. Rohit – Veterinary Surgeon</li>
                    <li>🐾 Dr. Aditya – Animal Nutritionist</li>
                    <li>🐾 Dr. Mohit – Pet Grooming Specialist</li>
                </ul>
            </section>

            <section className="services">
                <h2>Our Services</h2>
                <p>We offer a variety of services, including:</p>
                <ul>
                    <li>✔ General Checkups & Vaccinations</li>
                    <li>✔ Emergency Care & Surgeries</li>
                    <li>✔ Dental Care & Grooming</li>

                </ul>
            </section>

            <section className="contact">
                <h2>Contact Us</h2>
                <p>📍 123 Lodhi Road New Delhi</p>
                <p>📞 +91 9853728400</p>
                <p>📧 contact@petvet.com</p>
                <button className="btn" onClick={() => nav("/appointment")}>Book an Appointment</button>
            </section>
        </div>
    );
}
export default Aboutus