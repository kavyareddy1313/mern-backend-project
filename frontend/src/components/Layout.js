import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main style={{ flex: 1, padding: '4rem 2%', width: '100%' }}>
                <div className="fade-in">
                    {children}
                </div>
            </main>
            <footer style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                &copy; 2026 MediTrack Health Systems. All rights reserved.
            </footer>
        </div>
    );
};

export default Layout;
