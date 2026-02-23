import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Book() {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [data, setData] = useState({
        Department: "",
        doctorName: "",
        patientName: JSON.parse(localStorage.getItem('user'))?.name || "",
        date: new Date().toISOString().split('T')[0],
        timeSlot: ""
    });

    const departmentsList = [
        "Cardiology", "Neurology", "Pediatrics", "Orthopedics", "General Medicine", "Dermatology"
    ];

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await API.get("/auth/doctors");
                setDoctors(res.data);
            } catch (err) {
                console.error("Failed to fetch doctors", err);
            }
        };
        fetchDoctors();
    }, []);

    useEffect(() => {
        if (data.Department) {
            const matched = doctors.filter(doc => doc.specialization === data.Department);
            setFilteredDoctors(matched);
            setData(prev => ({ ...prev, doctorName: "" })); // Reset selection on dept change
        } else {
            setFilteredDoctors([]);
        }
    }, [data.Department, doctors]);

    const handleChange = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await API.post("/appointments", data);
            alert("Appointment Booked Successfully! 🎉");
            navigate("/appointments");
        } catch (err) {
            alert("Booking failed. Please check your connection.");
        }
    };

    return (
        <div className="container-full">
            <div className="crystal-card" style={{ padding: '5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                    <h1 style={{ marginBottom: '1.5rem', background: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Reserve Clinical Session
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.8rem', fontWeight: 500 }}>
                        Initialize Your Advanced Healthcare Interaction
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
                    <div className="fade-in">
                        <label className="superb-label">Medical Department</label>
                        <select
                            name="Department"
                            value={data.Department}
                            onChange={(e) => setData({ ...data, Department: e.target.value })}
                            required
                        >
                            <option value="">Select Domain focus</option>
                            {departmentsList.map((spec, i) => (
                                <option key={i} value={spec}>{spec}</option>
                            ))}
                        </select>
                    </div>

                    <div className="fade-in" style={{ animationDelay: '0.1s' }}>
                        <label className="superb-label">Clinical Specialist</label>
                        <select
                            name="doctorName"
                            value={data.doctorName}
                            onChange={(e) => setData({ ...data, doctorName: e.target.value })}
                            required
                            disabled={!data.Department}
                        >
                            <option value="">{data.Department ? "Choose Your Consultant" : "Select Department First"}</option>
                            {filteredDoctors.map((doc, i) => (
                                <option key={i} value={doc.name}>Dr. {doc.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="fade-in" style={{ animationDelay: '0.2s' }}>
                        <label className="superb-label">Session Date Request</label>
                        <input
                            name="date"
                            type="date"
                            value={data.date}
                            onChange={(e) => setData({ ...data, date: e.target.value })}
                            required
                        />
                    </div>

                    <div className="fade-in" style={{ animationDelay: '0.3s' }}>
                        <label className="superb-label">Clinical Window Time</label>
                        <select
                            value={data.timeSlot}
                            onChange={(e) => setData({ ...data, timeSlot: e.target.value })}
                            required
                        >
                            <option value="">Select Access Window</option>
                            <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                            <option value="11:30 AM - 12:30 PM">11:30 AM - 12:30 PM</option>
                            <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                            <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                        </select>
                    </div>

                    <div style={{ gridColumn: 'span 2', marginTop: '3rem', display: 'flex', justifyContent: 'center' }}>
                        <button type="submit" style={{ width: '50%', height: '6rem', fontSize: '1.8rem', letterSpacing: '0.2em' }}>
                            Confirm Clinical Reservation
                        </button>
                    </div>
                </form>

                <style jsx>{`
                    .superb-label {
                        display: block;
                        font-size: 1rem;
                        font-weight: 700;
                        color: var(--primary);
                        text-transform: uppercase;
                        letter-spacing: 0.15em;
                        margin-bottom: 0.5rem;
                    }
                `}</style>
            </div>
        </div>
    );
}
