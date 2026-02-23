import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Book from "./pages/Book";
import Appointments from "./pages/Appointments";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/book" element={<Book />} />
                    <Route path="/appointments" element={<Appointments />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
