import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import socket from "./Socket"; // Import shared socket

const PatientChat = () => {
    const nav = useNavigate()
    const { doctorId } = useParams(); // Doctor ID from URL
    const storedUser = JSON.parse(localStorage.getItem("user")); // Patient info
    const patientId = storedUser?.id;
    const patientName = storedUser?.name || "Patient";

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    const roomId = `${doctorId}-${patientId}`; // Generate consistent room ID

    useEffect(() => {
        if (!doctorId || !patientId) return;

        socket.emit("join_room", { roomId });

        // ✅ Load previous messages from localStorage
        const savedMessages = localStorage.getItem(roomId);
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }

        socket.on("receive_message", (msg) => {
            if (msg.sender !== patientName) { // ✅ Prevent adding sent messages twice
                setMessages((prev) => {
                    const updatedMessages = [...prev, msg];
                    localStorage.setItem(roomId, JSON.stringify(updatedMessages)); // Save messages
                    return updatedMessages;
                });
            }
        });

        return () => {
            socket.off("receive_message"); // Cleanup listener
        };
    }, [doctorId, patientId]);

    const sendMessage = () => {
        if (!message.trim()) return;

        const msgData = {
            doctorId,
            patientId,
            sender: patientName,
            message,
        };

        socket.emit("send_message", msgData);

        // ✅ Directly add the message without waiting for the socket response
        setMessages((prev) => {
            const updatedMessages = [...prev, msgData];
            localStorage.setItem(roomId, JSON.stringify(updatedMessages)); // Save messages
            return updatedMessages;
        });

        setMessage(""); // Clear input field
    };

    return (
        <div className="a">
            <h2 className="b">💬 Chat with Doctor</h2>
            <div className="c">
                {messages.map((msg, index) => (
                    <p key={index} className={`d ${msg.sender === patientName ? "e" : "f"}`}>
                        <strong>{msg.sender}:</strong> {msg.message}
                    </p>
                ))}
            </div>
            <div className="g">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="h"
                />

            </div>
            <button onClick={sendMessage} className="i">
                ➤
            </button>
            <button onClick={() => nav("/messages")} className="j">Back</button>
        </div>

    );
};

export default PatientChat;
