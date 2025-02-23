import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import socket from "./Socket"; // Import shared socket

const ChatRoom = () => {
    const nav = useNavigate()
    const { patientId } = useParams(); // Patient ID from URL
    const storedUser = JSON.parse(localStorage.getItem("user")); // Doctor info
    const doctorId = storedUser?.id;
    const doctorName = storedUser?.name || "Doctor";

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    const roomId = `${doctorId}-${patientId}`; // Generate consistent room ID

    // Load messages from localStorage
    useEffect(() => {
        if (!doctorId || !patientId) return;

        socket.emit("join_room", { roomId });

        const savedMessages = localStorage.getItem(roomId);
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages)); // Load messages from localStorage
        }

        socket.on("receive_message", (msg) => {
            if (msg.sender !== doctorName) { // ✅ Avoid adding sent messages again
                setMessages((prev) => {
                    const updatedMessages = [...prev, msg];
                    localStorage.setItem(roomId, JSON.stringify(updatedMessages)); // Save in localStorage
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
            sender: doctorName,
            message,
        };

        socket.emit("send_message", msgData);

        // ✅ Directly add the message without waiting for socket response
        setMessages((prev) => {
            const updatedMessages = [...prev, msgData];
            localStorage.setItem(roomId, JSON.stringify(updatedMessages)); // Save in localStorage
            return updatedMessages;
        });

        setMessage(""); // Clear input field
    };

    return (
        <div className="a">
            <h2 className="b">💬 Chat with Patient</h2>

            <div className="c">
                {messages.map((msg, index) => (
                    <p key={index} className={`d ${msg.sender === doctorName ? "e" : "f"}`}>
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
                    className="x-input"
                />

            </div>
            <button onClick={sendMessage} className="i">➤</button>
            <button onClick={() => nav("/patients")} className="j">Back</button>
        </div>

    );
};

export default ChatRoom;
