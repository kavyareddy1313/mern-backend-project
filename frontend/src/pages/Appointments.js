import { useState, useEffect } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments");
      setAppointments(res.data);
    } catch (err) {
      console.error("Failed to fetch appointments", err);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await API.put(`/appointments/${id}`, { status });
      fetchAppointments(); 
    } catch (err) {
      alert("Failed to update status. Check backend connection.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="container-full">
      <div className="crystal-card" style={{ padding: '5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <h1 style={{ marginBottom: '1.5rem', background: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {user.role === 'doctor' ? 'Patient Case Registry' : 'Clinical Consultation History'}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.8rem', fontWeight: 500 }}>
            {user.role === 'doctor' ? 'Professional Oversight of Scheduled Medical Sessions' : 'Comprehensive Record of Your Clinical Journey'}
          </p>
        </div>

        <div className="dashboard-table-container">
          <table className="superb-table">
            <thead>
              <tr>
                <th>{user.role === 'doctor' ? 'Patient Name' : 'Consultant Name'}</th>
                <th>Department</th>
                <th>Appointment Date</th>
                <th>Execution Time</th>
                <th>Status</th>
                {user.role === 'doctor' && <th>Oversight Actions</th>}
              </tr>
            </thead>
            <tbody>
              {appointments.map((apt, i) => (
                <tr key={apt._id} className="fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                  <td style={{ fontWeight: 800 }}>
                    {user.role === 'doctor' ? apt.patientName : `Dr. ${apt.doctorName}`}
                  </td>
                  <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{apt.Department}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{new Date(apt.date).toLocaleDateString()}</td>
                  <td style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{apt.time || apt.timeSlot}</td>
                  <td>
                    <span className={`superb-badge badge-${apt.status}`}>
                      {apt.status}
                    </span>
                  </td>
                  {user.role === 'doctor' && (
                    <td>
                      {apt.status === 'pending' && (
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                          <button
                            onClick={() => handleStatusUpdate(apt._id, 'approved')}
                            style={{ padding: '0.8rem 2rem', fontSize: '0.9rem', background: 'var(--success)' }}
                          >
                            Validate
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(apt._id, 'rejected')}
                            style={{ padding: '0.8rem 2rem', fontSize: '0.9rem', background: 'var(--accent)' }}
                          >
                            Decline
                          </button>
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
