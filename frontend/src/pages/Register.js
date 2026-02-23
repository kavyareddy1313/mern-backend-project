import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "patient",
        specialization: ""
    });
    const [error, setError] = useState("");

    const departmentsList = ["Cardiology", "Neurology", "Dermatology", "Pediatrics"];

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) return "Please enter a valid email address.";
        if (form.password.length < 6) return "Password must be at least 6 characters long.";
        if (form.password !== form.confirmPassword) return "Passwords do not match.";
        if (form.role === 'doctor' && !form.specialization) return "Please select your medical specialization.";
        return null;
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError("");
        const validationError = validateForm();
        if (validationError) return setError(validationError);

        try {
            const { confirmPassword, ...registerData } = form;
            await API.post("/auth/register", registerData);
            alert("Registration successful! Please login to your clinical dashboard.");
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.msg || "Registration failed. Try again.");
        }
    };

    return (
        <div className="container-full" style={{ padding: '4rem 0' }}>
            <div className="crystal-card" style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                    <h1 style={{ marginBottom: '1.5rem', background: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Clinical Onboarding
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.8rem', fontWeight: 500 }}>
                        Initialize Your Healthcare Session
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem' }}>
                    {error && (
                        <div style={{ gridColumn: 'span 2', padding: '2rem', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid var(--accent)', borderRadius: '20px', color: 'var(--accent)', marginBottom: '1.5rem', textAlign: 'center', fontSize: '1.2rem', fontWeight: 600 }}>
                            {error}
                        </div>
                    )}

                    <div className="fade-in">
                        <label style={labelStyle}>Full Legal Name</label>
                        <input
                            name="name"
                            placeholder="Enter your full name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="fade-in" style={{ animationDelay: '0.1s' }}>
                        <label style={labelStyle}>Electronic Mail Address</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="doc@meditrack.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="fade-in" style={{ animationDelay: '0.2s' }}>
                        <label style={labelStyle}>Security Credential</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Create a secure password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="fade-in" style={{ animationDelay: '0.3s' }}>
                        <label style={labelStyle}>Confirm Credential</label>
                        <input
                            name="confirmPassword"
                            type="password"
                            placeholder="Re-enter for verification"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="fade-in" style={{ animationDelay: '0.4s' }}>
                        <label style={labelStyle}>Professional Designation</label>
                        <select name="role" value={form.role} onChange={handleChange}>
                            <option value="patient">Standard Patient Role</option>
                            <option value="doctor">Licensed Medical Specialist</option>
                        </select>
                    </div>

                    {form.role === 'doctor' && (
                        <div className="fade-in" style={{ animationDelay: '0.5s' }}>
                            <label style={labelStyle}>Medical Specialization Focus</label>
                            <select name="specialization" value={form.specialization} onChange={handleChange} required>
                                <option value="">Select Domain focus</option>
                                {departmentsList.map((dept, i) => (
                                    <option key={i} value={dept}>{dept}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div style={{ gridColumn: 'span 2', marginTop: '3rem' }}>
                        <button type="submit" style={{ width: '100%', height: '6rem', fontSize: '1.8rem', letterSpacing: '0.2em' }}>
                            Finalize Session Registration
                        </button>
                    </div>
                </form>

                <div style={{ marginTop: '5rem', textAlign: 'center', fontSize: '1.3rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Already part of the network? </span>
                    <span
                        onClick={() => navigate('/')}
                        style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 800, textDecoration: 'underline', marginLeft: '0.5rem' }}
                    >
                        Authenticate Existing Session
                    </span>
                </div>
            </div>
        </div>
    );
}

const labelStyle = {
    display: 'block',
    fontSize: '0.9rem',
    fontWeight: 800,
    color: 'var(--primary)',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    marginBottom: '0.5rem'
};
