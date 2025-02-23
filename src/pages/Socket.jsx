import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
    transports: ["websocket"], // Ensures proper connection
    withCredentials: true
});

export default socket;
