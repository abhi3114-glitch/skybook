import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { bookingsApi } from '../services/api';
import type { Booking, Hotel } from '../types';

export default function MyBookings() {
    const location = useLocation();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        fetchBookings();
        if ((location.state as { success?: boolean })?.success) {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 5000);
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const fetchBookings = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await bookingsApi.getMyBookings();
            setBookings(data);
        } catch (err) {
            setError('Failed to load bookings.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelBooking = async (bookingId: string) => {
        if (!confirm('Are you sure you want to cancel this booking?')) return;
        try {
            await bookingsApi.cancel(bookingId);
            fetchBookings();
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            alert(error.response?.data?.message || 'Failed to cancel booking');
        }
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'confirmed':
                return { background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.5)' };
            case 'pending':
                return { background: 'rgba(234, 179, 8, 0.2)', color: '#facc15', border: '1px solid rgba(234, 179, 8, 0.5)' };
            case 'cancelled':
                return { background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.5)' };
            default:
                return { background: 'rgba(100, 116, 139, 0.2)', color: '#94a3b8', border: '1px solid rgba(100, 116, 139, 0.5)' };
        }
    };

    const getHotelData = (booking: Booking) => {
        if (typeof booking.hotel === 'object' && booking.hotel !== null) {
            return {
                name: (booking.hotel as Hotel).name,
                location: (booking.hotel as Hotel).location,
                images: (booking.hotel as Hotel).images || [],
            };
        }
        return { name: 'Hotel', location: '', images: [] };
    };

    return (
        <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>My Bookings</h1>
                    <p style={{ color: '#94a3b8' }}>View and manage your reservations</p>
                </div>

                {showSuccess && (
                    <div className="toast toast-success" style={{ position: 'relative', bottom: 'auto', right: 'auto', marginBottom: '1.5rem' }}>
                        Booking confirmed successfully!
                    </div>
                )}

                {isLoading ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="glass-card" style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '1.5rem' }}>
                                    <div className="skeleton" style={{ width: '160px', height: '112px', borderRadius: '0.5rem', flexShrink: 0 }} />
                                    <div style={{ flex: 1 }}>
                                        <div className="skeleton" style={{ height: '24px', width: '50%', marginBottom: '0.75rem' }} />
                                        <div className="skeleton" style={{ height: '16px', width: '30%', marginBottom: '0.75rem' }} />
                                        <div className="skeleton" style={{ height: '16px', width: '60%' }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚠️</div>
                        <p style={{ color: '#f87171', marginBottom: '1rem' }}>{error}</p>
                        <button onClick={fetchBookings} className="btn-primary">Try Again</button>
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="glass-card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>📅</div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'white', marginBottom: '0.75rem' }}>No Bookings Yet</h2>
                        <p style={{ color: '#94a3b8', marginBottom: '1.5rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
                            You haven't made any reservations yet. Start exploring hotels!
                        </p>
                        <Link to="/hotels" className="btn-primary">Browse Hotels</Link>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {bookings.map((booking) => {
                            const hotelData = getHotelData(booking);
                            return (
                                <div key={booking._id} className="glass-card" style={{ padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', gap: '1.5rem', flexWrap: 'wrap' }}>
                                        <div style={{ width: '160px', height: '112px', borderRadius: '0.5rem', overflow: 'hidden', flexShrink: 0 }}>
                                            <img
                                                src={hotelData.images[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'}
                                                alt={hotelData.name}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>

                                        <div style={{ flex: 1, minWidth: '200px' }}>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.75rem' }}>
                                                <div>
                                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white', marginBottom: '0.25rem' }}>
                                                        {hotelData.name}
                                                    </h3>
                                                    <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{hotelData.location}</p>
                                                </div>
                                                <span style={{
                                                    ...getStatusStyle(booking.status),
                                                    padding: '0.25rem 0.75rem',
                                                    borderRadius: '9999px',
                                                    fontSize: '0.875rem',
                                                    fontWeight: 500,
                                                }}>
                                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                                </span>
                                            </div>

                                            <p style={{ color: 'white', fontWeight: 500, marginBottom: '0.5rem' }}>{booking.room.name}</p>

                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '1rem' }}>
                                                <span>📅 {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}</span>
                                                <span>👥 {booking.guests.adults} adults{booking.guests.children > 0 ? `, ${booking.guests.children} children` : ''}</span>
                                            </div>

                                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>
                                                    ${booking.totalPrice.toFixed(2)}
                                                </div>
                                                {booking.status !== 'cancelled' && (
                                                    <button
                                                        onClick={() => handleCancelBooking(booking._id)}
                                                        style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500 }}
                                                    >
                                                        Cancel Booking
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
