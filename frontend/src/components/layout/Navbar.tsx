import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
    const location = useLocation();
    const { isAuthenticated, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (path: string) => location.pathname === path;

    const linkStyle = (path: string) => ({
        color: isActive(path) ? '#60a5fa' : '#cbd5e1',
        textDecoration: 'none',
        fontWeight: 500,
        transition: 'color 0.2s',
        padding: '0.5rem 0',
    });

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '64px',
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
            zIndex: 50,
        }}>
            <div style={{
                maxWidth: '1280px',
                margin: '0 auto',
                height: '100%',
                padding: '0 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                        borderRadius: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '1.25rem',
                    }}>
                        🏨
                    </div>
                    <span style={{ color: 'white', fontWeight: 700, fontSize: '1.25rem' }}>SkyBook</span>
                </Link>

                {/* Desktop Nav */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
                    <Link to="/hotels" style={linkStyle('/hotels')}>Hotels</Link>

                    {isAuthenticated ? (
                        <>
                            <Link to="/bookings" style={linkStyle('/bookings')}>My Bookings</Link>
                            <button
                                onClick={logout}
                                style={{
                                    background: 'transparent',
                                    border: '2px solid #3b82f6',
                                    color: 'white',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                style={{
                                    background: 'transparent',
                                    border: '2px solid #3b82f6',
                                    color: 'white',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '0.5rem',
                                    textDecoration: 'none',
                                    fontWeight: 600,
                                }}
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="btn-primary"
                                style={{ textDecoration: 'none' }}
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    style={{
                        display: 'none',
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                    }}
                    className="mobile-menu-btn"
                >
                    {isMenuOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div style={{
                    position: 'absolute',
                    top: '64px',
                    left: 0,
                    right: 0,
                    background: 'rgba(15, 23, 42, 0.98)',
                    borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                }}>
                    <Link to="/hotels" style={linkStyle('/hotels')} onClick={() => setIsMenuOpen(false)}>Hotels</Link>
                    {isAuthenticated ? (
                        <>
                            <Link to="/bookings" style={linkStyle('/bookings')} onClick={() => setIsMenuOpen(false)}>My Bookings</Link>
                            <button onClick={() => { logout(); setIsMenuOpen(false); }} className="btn-secondary" style={{ textAlign: 'left' }}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={linkStyle('/login')} onClick={() => setIsMenuOpen(false)}>Login</Link>
                            <Link to="/register" className="btn-primary" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                        </>
                    )}
                </div>
            )}

            <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
        </nav>
    );
}
