import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        navigate('/');
        return null;
    }

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div className="container-full">
            <div className="crystal-card" style={{ padding: '5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8rem' }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
                            <span style={{ fontSize: '5.5rem', filter: 'drop-shadow(0 0 25px var(--primary))' }}>
                                {user.role === 'doctor' ? '🧑‍⚕️' : '👤'}
                            </span>
                            <h1 className="aurora-text" style={{ fontSize: '6rem', margin: 0, fontWeight: 900 }}>
                                {user.role === 'doctor' ? 'Dr. ' : ''}{user.name}
                            </h1>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '2rem', fontWeight: 600, opacity: 0.9, marginLeft: '7.5rem' }}>
                            {user.role === 'doctor' ? 'Clinical Oversight & Management Principal' : 'Patient Healthcare & Appointment Hub'}
                        </p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
                    {user.role === 'patient' && (
                        <div className="crystal-card" onClick={() => navigate('/book')} style={actionCardStyle}>
                            <span style={{ fontSize: '5rem', marginBottom: '2rem', display: 'block' }}>📅</span>
                            <h2>Book Appointment</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginTop: '1rem' }}>Initiate a New Clinical Consultation Request.</p>
                        </div>
                    )}

                    <div className="crystal-card" onClick={() => navigate('/appointments')} style={actionCardStyle}>
                        <span style={{ fontSize: '5rem', marginBottom: '2rem', display: 'block' }}>📋</span>
                        <h2>{user.role === 'doctor' ? 'Clinical Schedule' : 'Medical Records'}</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginTop: '1rem' }}>
                            {user.role === 'doctor' ? 'Review and Managed Patient Appointments.' : 'Access History and Status Updates.'}
                        </p>
                    </div>

                    <div className="crystal-card" onClick={handleLogout} style={{ ...actionCardStyle, border: '1px solid rgba(244, 63, 94, 0.3)' }}>
                        <span style={{ fontSize: '5rem', marginBottom: '2rem', display: 'block' }}>🚪</span>
                        <h2>Exit Portal</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginTop: '1rem' }}>Securely Terminate Your Medical Session.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const actionCardStyle = {
    padding: '4rem',
    cursor: 'pointer',
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.02)',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
};
