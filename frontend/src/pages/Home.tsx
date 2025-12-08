import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    const [location, setLocation] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(2);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (location) params.append('location', location);
        if (checkIn) params.append('checkIn', checkIn);
        if (checkOut) params.append('checkOut', checkOut);
        params.append('guests', guests.toString());
        navigate(`/hotels?${params.toString()}`);
    };

    const popularDestinations = [
        { name: 'Miami Beach', image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400', hotels: 245 },
        { name: 'New York', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400', hotels: 512 },
        { name: 'Aspen', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400', hotels: 87 },
        { name: 'Maui', image: 'https://images.unsplash.com/photo-1542259009477-d625272157b7?w=400', hotels: 156 },
    ];

    return (
        <div style={{ paddingTop: '64px' }}>
            {/* Hero Section */}
            <section
                style={{
                    position: 'relative',
                    height: '100vh',
                    minHeight: '700px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    marginTop: '-64px',
                    paddingTop: '64px',
                }}
            >
                {/* Background Image */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 0,
                    }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920"
                        alt="Hero background"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.6) 50%, rgb(15, 23, 42) 100%)',
                        }}
                    />
                </div>

                {/* Hero Content */}
                <div
                    style={{
                        position: 'relative',
                        zIndex: 10,
                        textAlign: 'center',
                        padding: '0 1rem',
                        maxWidth: '1200px',
                        width: '100%',
                    }}
                >
                    <h1
                        style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                            fontWeight: 700,
                            color: 'white',
                            marginBottom: '1.5rem',
                            lineHeight: 1.1,
                        }}
                    >
                        Find Your Perfect
                        <span
                            style={{
                                display: 'block',
                                background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            Stay Anywhere
                        </span>
                    </h1>
                    <p
                        style={{
                            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                            color: '#cbd5e1',
                            maxWidth: '600px',
                            margin: '0 auto 2.5rem',
                        }}
                    >
                        Discover amazing hotels, resorts, and vacation rentals at the best prices.
                        Your dream vacation starts here.
                    </p>

                    {/* Search Form */}
                    <form
                        onSubmit={handleSearch}
                        className="glass-card"
                        style={{
                            padding: '1.5rem',
                            maxWidth: '900px',
                            margin: '0 auto',
                        }}
                    >
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                                gap: '1rem',
                            }}
                        >
                            <div style={{ textAlign: 'left' }}>
                                <label style={{ color: '#94a3b8', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                                    Where
                                </label>
                                <input
                                    type="text"
                                    placeholder="Search destinations..."
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="input-field"
                                />
                            </div>

                            <div style={{ textAlign: 'left' }}>
                                <label style={{ color: '#94a3b8', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                                    Check In
                                </label>
                                <input
                                    type="date"
                                    value={checkIn}
                                    onChange={(e) => setCheckIn(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="input-field"
                                />
                            </div>

                            <div style={{ textAlign: 'left' }}>
                                <label style={{ color: '#94a3b8', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                                    Check Out
                                </label>
                                <input
                                    type="date"
                                    value={checkOut}
                                    onChange={(e) => setCheckOut(e.target.value)}
                                    min={checkIn || new Date().toISOString().split('T')[0]}
                                    className="input-field"
                                />
                            </div>

                            <div style={{ textAlign: 'left' }}>
                                <label style={{ color: '#94a3b8', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                                    Guests
                                </label>
                                <select
                                    value={guests}
                                    onChange={(e) => setGuests(Number(e.target.value))}
                                    className="input-field"
                                >
                                    {[1, 2, 3, 4, 5, 6].map((num) => (
                                        <option key={num} value={num}>
                                            {num} {num === 1 ? 'Guest' : 'Guests'}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn-primary"
                            style={{ marginTop: '1.5rem', padding: '0.875rem 3rem' }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ width: '20px', height: '20px' }}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            Search Hotels
                        </button>
                    </form>
                </div>
            </section>

            {/* Popular Destinations */}
            <section style={{ padding: '5rem 1rem', maxWidth: '1280px', margin: '0 auto' }}>
                <h2
                    style={{
                        fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                        fontWeight: 700,
                        color: 'white',
                        textAlign: 'center',
                        marginBottom: '1rem',
                    }}
                >
                    Popular Destinations
                </h2>
                <p
                    style={{
                        color: '#94a3b8',
                        textAlign: 'center',
                        marginBottom: '3rem',
                        maxWidth: '600px',
                        margin: '0 auto 3rem',
                    }}
                >
                    Explore our most sought-after destinations and find your next adventure
                </p>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '1.5rem',
                    }}
                >
                    {popularDestinations.map((dest) => (
                        <button
                            key={dest.name}
                            onClick={() => navigate(`/hotels?location=${encodeURIComponent(dest.name)}`)}
                            style={{
                                position: 'relative',
                                height: '280px',
                                borderRadius: '1rem',
                                overflow: 'hidden',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0,
                            }}
                        >
                            <img
                                src={dest.image}
                                alt={dest.name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.5s',
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
                                }}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: '1.5rem',
                                    left: '1.5rem',
                                    textAlign: 'left',
                                }}
                            >
                                <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                                    {dest.name}
                                </h3>
                                <p style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>{dest.hotels} hotels</p>
                            </div>
                        </button>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section style={{ padding: '5rem 1rem', background: 'rgba(15, 23, 42, 0.5)' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <h2
                        style={{
                            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                            fontWeight: 700,
                            color: 'white',
                            textAlign: 'center',
                            marginBottom: '1rem',
                        }}
                    >
                        Why Choose SkyBook
                    </h2>
                    <p
                        style={{
                            color: '#94a3b8',
                            textAlign: 'center',
                            marginBottom: '3rem',
                            maxWidth: '600px',
                            margin: '0 auto 3rem',
                        }}
                    >
                        We make booking your perfect stay simple, secure, and stress-free
                    </p>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '2rem',
                        }}
                    >
                        {[
                            {
                                icon: '💰',
                                title: 'Best Price Guarantee',
                                description: 'We offer competitive prices and match any lower rate you find elsewhere.',
                            },
                            {
                                icon: '🔒',
                                title: 'Secure Booking',
                                description: 'Your personal and payment information is protected with industry-standard encryption.',
                            },
                            {
                                icon: '📞',
                                title: '24/7 Support',
                                description: 'Our customer support team is available around the clock to assist you.',
                            },
                        ].map((feature) => (
                            <div
                                key={feature.title}
                                className="glass-card"
                                style={{ padding: '2rem', textAlign: 'center' }}
                            >
                                <div
                                    style={{
                                        width: '64px',
                                        height: '64px',
                                        background: 'rgba(59, 130, 246, 0.2)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 1.5rem',
                                        fontSize: '1.75rem',
                                    }}
                                >
                                    {feature.icon}
                                </div>
                                <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                                    {feature.title}
                                </h3>
                                <p style={{ color: '#94a3b8' }}>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '5rem 1rem' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <div
                        className="glass-card"
                        style={{
                            padding: '4rem 2rem',
                            textAlign: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(34, 211, 238, 0.2))',
                            }}
                        />
                        <div style={{ position: 'relative', zIndex: 10 }}>
                            <h2
                                style={{
                                    fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                                    fontWeight: 700,
                                    color: 'white',
                                    marginBottom: '1rem',
                                }}
                            >
                                Ready to Start Your Journey?
                            </h2>
                            <p style={{ color: '#cbd5e1', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
                                Sign up today and get exclusive deals on your first booking
                            </p>
                            <button
                                onClick={() => navigate('/register')}
                                className="btn-primary"
                                style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}
                            >
                                Get Started Free
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
