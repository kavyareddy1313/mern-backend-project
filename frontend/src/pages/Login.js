import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError("");
        try {
            const res = await API.post("/auth/login", form);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            alert("Login success! Redirecting to dashboard...");
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.msg || "Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="container-full" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="crystal-card" style={{ maxWidth: '1000px', padding: '6rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h1 style={{ marginBottom: '1.5rem', background: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        MediTrack Portal
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.8rem', fontWeight: 500 }}>
                        Secure Access to Clinical Systems
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    {error && (
                        <div style={{ padding: '2rem', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid var(--accent)', borderRadius: '20px', color: 'var(--accent)', marginBottom: '3rem', textAlign: 'center', fontSize: '1.2rem', fontWeight: 600 }}>
                            {error}
                        </div>
                    )}

                    <div style={{ marginBottom: '3rem' }}>
                        <label style={labelStyle}>Electronic Mail Address</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Enter your registered email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            style={{ height: '5rem', fontSize: '1.3rem' }}
                        />
                    </div>

                    <div style={{ marginBottom: '4rem' }}>
                        <label style={labelStyle}>Security Credential</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Enter your secure password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            style={{ height: '5rem', fontSize: '1.3rem' }}
                        />
                    </div>

                    <button type="submit" style={{ width: '100%', height: '6rem', fontSize: '1.8rem', letterSpacing: '0.2em' }}>
                        Authenticate session
                    </button>
                </form>

                <div style={{ marginTop: '4rem', textAlign: 'center', fontSize: '1.2rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>New healthcare provider or patient? </span>
                    <span
                        onClick={() => navigate('/register')}
                        style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 800, textDecoration: 'underline', marginLeft: '0.5rem' }}
                    >
                        Initialize Registration
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
