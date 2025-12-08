import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer style={{
            background: 'rgba(15, 23, 42, 0.8)',
            borderTop: '1px solid rgba(148, 163, 184, 0.1)',
            padding: '3rem 1rem 1.5rem',
        }}>
            <div style={{
                maxWidth: '1280px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '2rem',
                marginBottom: '2rem',
            }}>
                {/* Brand */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                        <div style={{
                            width: '36px',
                            height: '36px',
                            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                            borderRadius: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.125rem',
                        }}>
                            🏨
                        </div>
                        <span style={{ color: 'white', fontWeight: 700, fontSize: '1.125rem' }}>SkyBook</span>
                    </div>
                    <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.6 }}>
                        Discover and book your perfect stay at hotels around the world.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 style={{ color: 'white', fontWeight: 600, marginBottom: '1rem' }}>Quick Links</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <Link to="/hotels" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem' }}>Browse Hotels</Link>
                        <Link to="/bookings" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem' }}>My Bookings</Link>
                    </div>
                </div>

                {/* Support */}
                <div>
                    <h3 style={{ color: 'white', fontWeight: 600, marginBottom: '1rem' }}>Support</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Help Center</span>
                        <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Contact Us</span>
                        <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Privacy Policy</span>
                        <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Terms of Service</span>
                    </div>
                </div>

                {/* Connect */}
                <div>
                    <h3 style={{ color: 'white', fontWeight: 600, marginBottom: '1rem' }}>Connect</h3>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {['Twitter', 'Instagram', 'Facebook'].map((social) => (
                            <a
                                key={social}
                                href="#"
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    background: 'rgba(148, 163, 184, 0.1)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#94a3b8',
                                    textDecoration: 'none',
                                    fontSize: '0.75rem',
                                }}
                                title={social}
                            >
                                {social[0]}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{
                borderTop: '1px solid rgba(148, 163, 184, 0.1)',
                paddingTop: '1.5rem',
                textAlign: 'center',
                color: '#64748b',
                fontSize: '0.875rem',
            }}>
                &copy; {new Date().getFullYear()} SkyBook. All rights reserved.
            </div>
        </footer>
    );
}
