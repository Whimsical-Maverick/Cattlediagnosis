import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./component/Navbar";
import Aboutus from "./pages/Aboutus";
import Login from "./pages/Login";
import Healthguide from "./pages/Healthguide";
import Register from "./pages/Register";
import Docreg from "./pages/Docreg";
import Bookdoc from "./pages/Bookdoc";
import Appoint from "./pages/Appoint";
import Doclogin from "./pages/Doclogin";
import Docdash from "./pages/Docdash";
import Cattle from "./pages/Cattle";
import Chat from "./pages/Chat";
import ChatRoom from "./pages/ChatRoom";
import Messagepage from "./pages/Messagepage";
import PatientChat from "./pages/PatientChat";
import DocPro from "./pages/DocPro";
import Change from "./pages/Change";

function Layout() {
  const location = useLocation();
  const hidepath = ["/doctor/dashboard", "/patients", "/chat", "/chatting", "/change", "/profile"]
  const hidevav = hidepath.some((path) => location.pathname.startsWith(path))

  return (
    <>
      {!hidevav && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Aboutus />} />
        <Route path="/register" element={<Register />} />
        <Route path="/healthguide" element={<Healthguide />} />
        <Route path="/doctor/register" element={<Docreg />} />
        <Route path="/appointment" element={<Bookdoc />} />
        <Route path="/appointreg" element={<Appoint />} />
        <Route path="/Doclogin" element={<Doclogin />} />
        <Route path="/doctor/dashboard" element={<Docdash />} />
        <Route path="/cattle" element={<Cattle />} />
        <Route path="/patients" element={<Chat />} />
        <Route path="/chat/:patientId" element={<ChatRoom />} />
        <Route path="/cattle" element={<Cattle />} />
        <Route path="/messages" element={<Messagepage />} />
        <Route path="/chatting/:doctorId" element={<PatientChat />} />
        <Route path="/profile" element={<DocPro />} />
        <Route path="/change/:doctorId" element={<Change />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
