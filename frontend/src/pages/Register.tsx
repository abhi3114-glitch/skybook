import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const { firstName, lastName, email, password, confirmPassword, phoneNumber } = formData;

        if (!firstName || !lastName || !email || !password) {
            setError('Please fill in all required fields');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            setIsLoading(true);
            await register({ firstName, lastName, email, password, phoneNumber });
            navigate('/', { replace: true });
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            setError(error.response?.data?.message || 'Failed to create account');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
            <div className="glass-card" style={{ padding: '2rem', width: '100%', maxWidth: '400px' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                        borderRadius: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem',
                        fontSize: '2rem',
                    }}>
                        ✨
                    </div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
                        Create Account
                    </h1>
                    <p style={{ color: '#94a3b8' }}>Join SkyBook and start booking</p>
                </div>

                {error && (
                    <div style={{
                        background: 'rgba(239, 68, 68, 0.2)',
                        border: '1px solid rgba(239, 68, 68, 0.5)',
                        color: '#f87171',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        marginBottom: '1.5rem',
                        fontSize: '0.875rem',
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ color: '#94a3b8', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                                First Name *
                            </label>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" className="input-field" disabled={isLoading} />
                        </div>
                        <div>
                            <label style={{ color: '#94a3b8', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                                Last Name *
                            </label>
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" className="input-field" disabled={isLoading} />
                        </div>
                    </div>

                    <div>
                        <label style={{ color: '#94a3b8', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Email *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className="input-field" disabled={isLoading} />
                    </div>

                    <div>
                        <label style={{ color: '#94a3b8', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Phone Number</label>
                        <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="+1 234 567 8900" className="input-field" disabled={isLoading} />
                    </div>

                    <div>
                        <label style={{ color: '#94a3b8', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Password *</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="input-field" disabled={isLoading} />
                        <p style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.25rem' }}>Minimum 6 characters</p>
                    </div>

                    <div>
                        <label style={{ color: '#94a3b8', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Confirm Password *</label>
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" className="input-field" disabled={isLoading} />
                    </div>

                    <button type="submit" disabled={isLoading} className="btn-primary" style={{ padding: '0.875rem', marginTop: '0.5rem', opacity: isLoading ? 0.5 : 1 }}>
                        {isLoading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <div style={{ marginTop: '2rem', textAlign: 'center', color: '#94a3b8' }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: 500 }}>Sign in</Link>
                </div>
            </div>
        </div>
    );
}
