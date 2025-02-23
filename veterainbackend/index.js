process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
console.log("Starting server...")
import express from "express"
import mongoose from "mongoose"
import Owner from "./ownerdb.js"
import { Hashpass } from "./encrypt.js"
import { Compare } from "./encrypt.js"
import session from "express-session"
import bcrypt from 'bcrypt'
import cors from 'cors'
import Doctor from "./doctordb.js"
import Appoint from "./appointmentdb.js"
import multer from "multer"
import path from "path"
import { ObjectId } from "mongoose";
import { spawn } from "child_process"
import { Server } from "socket.io"
import http from 'http'

import { fileURLToPath } from "url";

const app = express()

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
mongoose.connect("mongodb://localhost:27017/owner_data")
    .then(() => {
        console.log("✅ Connected to DB..");
    })
    .catch((err) => {
        console.error("❌ Error connecting to DB:", err);
    });

app.use(cors())
app.use(express.json())
app.use("/uploads", express.static(path.join("uploads")))
app.use(session({
    secret: "owner_pets", // Change this in production
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000 * 60,
    }
}))
io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    socket.on("join_room", ({ roomId }) => {
        socket.join(roomId);
        console.log(`🔵 User ${socket.id} joined room: ${roomId}`);
    });

    socket.on("send_message", ({ doctorId, patientId, sender, message }) => {
        const roomId = `${doctorId}-${patientId}`;
        const msgData = { sender, message, timestamp: new Date() };

        console.log(`📨 Sending message to room ${roomId}:`, msgData);

        io.to(roomId).emit("receive_message", msgData);
    });

    socket.on("disconnect", () => {
        console.log("🔴 User disconnected:", socket.id);
    });
});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save files in the uploads/ directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });
app.post('/register/owner', upload.single("vaccin_certificate"), async (req, res) => {
    try {
        console.log(req.body)
        let { username, email, contact, street, state, country, zip, password, pet_name, pet_species, weight } = req.body
        const saltRounds = 5;
        password = await bcrypt.hash(password, saltRounds);
        console.log("Password hashed successfully");
        const adduser = new Owner({
            username,
            email,
            contact,
            street,
            state,
            country,
            zip,
            password,
            pet_name,
            pet_species,
            weight,
            vaccin_certificate: req.file ? `/uploads/${req.file.filename}` : null
        })

        await adduser.save()
        return res.json({ message: "Data added to db" })
    } catch (error) {
        console.error("Error in /register/owner:", error);
        return res.status(500).json({ error: "error in registration" })
    }
})

app.post("/register/doctor", async (req, res) => {
    try {
        const newDoctor = new Doctor(req.body);
        await newDoctor.save();
        res.status(201).json({ message: "Doctor reg successfull" })
    } catch (error) {
        console.error("Error registering doctor:", error);
        res.status(500).json({ error: "Error in registration" });
    }
});
app.post('/login/owner', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Owner.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const pass = await bcrypt.compare(password, user.password);
        if (!pass) {
            return res.status(400).json({ error: "Invalid password" });
        }

        req.session.ownerId = user._id;

        // ✅ Include `_id` in response as a string
        return res.status(200).json({
            message: "Login successful!",
            id: user._id.toString(), // ✅ Ensure `_id` is sent as a string
            name: user.username
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error logging in" });
    }
});

app.post('/login/doctor', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the doctor by email
        const user = await Doctor.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Compare entered password with hashed password


        // Store doctor ID in session
        req.session.doctorId = user._id;
        console.log("Doctor session created:", req.session.doctorId);
        console.log(user._id.toString())
        return res.status(200).json({
            message: "Login successful!",
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                specialization: user.specialization,
                hospital_name: user.hospital_name
            }
        });

    } catch (error) {
        console.error("Error in doctor login:", error);
        return res.status(500).json({ error: "Error logging in" });
    }
});
app.get('/get/doctors', async (req, res) => {
    try {
        const doctors = await Doctor.find()
        return res.status(200).json(doctors)
    } catch (error) {
        console.error("Error fetching doctors:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
})


app.post('/get/appointment', upload.single("vaccin"), async (req, res) => {
    try {
        const { doctorId, date, time, patientName, phone, patientId, vaccin } = req.body
        const data = new Appoint({
            doctorId,
            date,
            time,
            patientName,
            phone,
            patientId,
            vaccin: req.file ? `/uploads/${req.file.filename}` : null,


        })
        await data.save();
        return res.status(201).json({ message: "Appointment booked successfully!" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Failed to book appointment" });
    }
})
app.get("/a", async (req, res) => {
    try {
        const { id } = req.query;

        // Validate if ID exists and is a valid MongoDB ObjectId
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid doctor ID format" });
        }

        const objectId = new mongoose.Types.ObjectId(id);
        const appointments = await Appoint.find({ doctorId: objectId });

        if (!appointments.length) {
            return res.status(404).json({ message: "No appointments found" });
        }

        res.json(appointments); // Ensure response includes the correct data
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/api', async (req, res) => {
    const check = await Appoint.find()

    console.log(check)
    res.status(200)
})
app.get("/get/patient/:patientId", async (req, res) => {
    const patient = await Appoint.findById(req.params.patientId)
    res.json(patient)
})
app.post("/predict", (req, res) => {
    const inputData = req.body.input;
    console.log(inputData)
    if (!inputData) {
        return res.status(400).json({ error: "No input data provided" });
    }

    const pythonProcess = spawn("python", ["model.py"]);

    pythonProcess.stdin.write(JSON.stringify({ input: inputData })); // Send JSON input
    pythonProcess.stdin.end();

    let output = "";

    pythonProcess.stdout.on("data", (data) => {
        output += data.toString();
    });

    pythonProcess.on("close", () => {
        try {
            const result = JSON.parse(output);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: "Invalid response from Python script" });
        }
    });

    pythonProcess.stderr.on("data", (data) => {
        console.error(`Error: ${data}`);
    });
});
app.get("/get/appoint/:patientId", async (req, res) => {
    const { patientId } = req.params;
    console.log(patientId)
    try {
        const appointments = await Appoint.find({ patientId });

        const doctorDetails = await Promise.all(
            appointments.map(async (appointment) => {
                const doctor = await DoctorModel.findById(appointment.doctorId);
                return { doctorId: doctor._id, doctorName: doctor.name };
            })
        );

        res.json({ doctors: doctorDetails });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch appointments." });
    }
});
app.get("/get/patient-doctors/:patientId", async (req, res) => {
    try {
        const { patientId } = req.params;

        // Find appointments for this patient
        const appointments = await Appoint.find({ patientId }).populate("doctorId", "name email specialization");

        // Extract unique doctor details
        const uniqueDoctors = [];
        const doctorSet = new Set();

        appointments.forEach((appointment) => {
            if (!doctorSet.has(appointment.doctorId._id.toString())) {
                doctorSet.add(appointment.doctorId._id.toString());
                uniqueDoctors.push(appointment.doctorId);
            }
        });

        res.status(200).json({ doctors: uniqueDoctors });
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({ error: "Failed to get doctors" });
    }
});
app.get("/check/doctor/:pass", async (req, res) => {
    try {
        const { pass } = req.params
        console.log(pass)
        const data = await Doctor.findOne({ password: pass })
        console.log(data)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: "Incorrect password try again" })
    }


})

app.get('/changeset/:docId', async (req, res) => {
    try {
        const { docId } = req.params
        const data = await Doctor.findById(docId)
        if (!data) {
            res.json({ error: "No doctor found" })
        }
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: "Error in finding the doctor" })
    }
})
app.put("/update/doctor/:id", async (req, res) => {
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedDoctor) {
            return res.status(404).json({ error: "Doctor not found" });
        }

        res.json({ message: "Doctor updated successfully", updatedDoctor });
    } catch (error) {
        res.status(500).json({ error: "Error updating doctor details" });
    }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
}).on('error', (err) => {
    console.error("❌ Server failed to start:", err);
});
