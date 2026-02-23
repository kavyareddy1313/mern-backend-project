import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <nav style={{
            position: 'sticky',
            top: '2rem',
            zIndex: 1000,
            padding: '0 2%',
            width: '100%'
        }}>
            <div className="crystal-card" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.5rem 4rem',
                borderRadius: '60px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 0 20px rgba(255,255,255,0.05)'
            }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '3rem' }}>🏥</span>
                    <Link to="/dashboard" style={{ textDecoration: 'none', background: 'linear-gradient(to right, #60a5fa, #3b82f6, #2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        MediTrack
                    </Link>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '3.5rem' }}>
                    {user ? (
                        <>
                            <Link to="/dashboard" style={navLinkStyle}>Dashboard</Link>
                            {user.role === 'patient' && (
                                <Link to="/book" style={navLinkStyle}>Book Consultation</Link>
                            )}
                            <div style={{ width: '2px', height: '25px', background: 'rgba(255,255,255,0.1)' }}></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                                <span style={{ fontSize: '1.8rem' }}>
                                    {user.role === 'doctor' ? '🧑‍⚕️' : '👤'}
                                </span>
                                <span className="aurora-text" style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                                    {user.role === 'doctor' ? 'Dr. ' : ''}{user.name}
                                </span>
                            </div>
                            <button onClick={handleLogout} style={{
                                padding: '1rem 2.5rem',
                                fontSize: '1.1rem',
                                fontWeight: 800,
                                borderRadius: '40px',
                                background: 'rgba(244, 63, 94, 0.15)',
                                color: 'var(--accent)',
                                border: '2px solid rgba(244, 63, 94, 0.3)',
                                boxShadow: '0 0 20px rgba(244, 63, 94, 0.2)',
                                transition: 'all 0.3s ease'
                            }}>
                                Logout Session
                            </button>
                        </>
                    ) : (
                        <Link to="/register" style={{ ...navLinkStyle, fontSize: '1.4rem', fontWeight: 800 }}>Get Started</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

const navLinkStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '1.2rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    transition: 'all 0.3s ease'
};

export default Navbar;
