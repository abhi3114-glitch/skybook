import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { hotelsApi, bookingsApi } from '../services/api';
import type { Hotel, Room } from '../types';
import { useAuth } from '../context/AuthContext';
import RoomCard from '../components/hotel/RoomCard';

export default function HotelDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const [hotel, setHotel] = useState<Hotel | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState(0);

    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [isBooking, setIsBooking] = useState(false);
    const [bookingError, setBookingError] = useState<string | null>(null);

    useEffect(() => {
        if (id) fetchHotel();
    }, [id]);

    const fetchHotel = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await hotelsApi.getById(id!);
            setHotel(data);
        } catch (err) {
            setError('Failed to load hotel details.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBookRoom = (room: Room) => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: `/hotels/${id}` } });
            return;
        }
        setSelectedRoom(room);
        setShowBookingModal(true);
        setBookingError(null);
    };

    const calculateTotalPrice = () => {
        if (!selectedRoom || !checkIn || !checkOut) return 0;
        const nights = Math.ceil(
            (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
        );
        return nights > 0 ? nights * selectedRoom.price : 0;
    };

    const handleConfirmBooking = async () => {
        if (!selectedRoom || !checkIn || !checkOut) return;
        try {
            setIsBooking(true);
            setBookingError(null);
            await bookingsApi.create({
                hotelId: id!,
                roomId: selectedRoom._id,
                checkIn,
                checkOut,
                guests: { adults, children },
            });
            setShowBookingModal(false);
            navigate('/bookings', { state: { success: true } });
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            setBookingError(error.response?.data?.message || 'Failed to create booking.');
        } finally {
            setIsBooking(false);
        }
    };

    if (isLoading) {
        return (
            <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1rem' }}>
                    <div className="skeleton" style={{ height: '400px', borderRadius: '1rem', marginBottom: '2rem' }} />
                    <div className="skeleton" style={{ height: '40px', width: '50%', marginBottom: '1rem' }} />
                    <div className="skeleton" style={{ height: '24px', width: '30%', marginBottom: '2rem' }} />
                    <div className="skeleton" style={{ height: '160px', borderRadius: '1rem', marginBottom: '1rem' }} />
                    <div className="skeleton" style={{ height: '160px', borderRadius: '1rem' }} />
                </div>
            </div>
        );
    }

    if (error || !hotel) {
        return (
            <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '400px' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚠️</div>
                    <p style={{ color: '#f87171', marginBottom: '1rem' }}>{error || 'Hotel not found'}</p>
                    <button onClick={() => navigate('/hotels')} className="btn-primary">Back to Hotels</button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1rem' }}>
                {/* Image Gallery */}
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ position: 'relative', height: '450px', borderRadius: '1rem', overflow: 'hidden', marginBottom: '1rem' }}>
                        <img
                            src={hotel.images[selectedImage] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920'}
                            alt={hotel.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    {hotel.images.length > 1 && (
                        <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                            {hotel.images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    style={{
                                        flexShrink: 0,
                                        width: '96px',
                                        height: '64px',
                                        borderRadius: '0.5rem',
                                        overflow: 'hidden',
                                        border: selectedImage === index ? '2px solid #3b82f6' : '2px solid transparent',
                                        opacity: selectedImage === index ? 1 : 0.6,
                                        cursor: 'pointer',
                                        padding: 0,
                                    }}
                                >
                                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Hotel Info */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', marginBottom: '3rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'white', marginBottom: '1rem' }}>
                            {hotel.name}
                        </h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <span style={{ background: '#3b82f6', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontWeight: 600 }}>
                                {hotel.rating.toFixed(1)} ★
                            </span>
                            <span style={{ color: '#94a3b8' }}>({hotel.reviews.toLocaleString()} reviews)</span>
                        </div>
                        <p style={{ color: '#94a3b8', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            📍 {hotel.address.street}, {hotel.address.city}, {hotel.address.state}
                        </p>
                        <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: '2rem' }}>{hotel.description}</p>

                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white', marginBottom: '1rem' }}>Amenities</h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {hotel.amenities.map((amenity) => (
                                <span
                                    key={amenity}
                                    style={{
                                        background: 'rgba(59, 130, 246, 0.2)',
                                        color: '#93c5fd',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                    }}
                                >
                                    {amenity}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: '1.5rem', height: 'fit-content', position: 'sticky', top: '96px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                            <span style={{ color: '#94a3b8' }}>Starting from</span>
                            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'white' }}>
                                ${Math.min(...hotel.rooms.map(r => r.price))}
                                <span style={{ fontSize: '1rem', fontWeight: 400, color: '#94a3b8' }}>/night</span>
                            </div>
                        </div>
                        <p style={{ color: '#94a3b8', textAlign: 'center', fontSize: '0.875rem' }}>
                            {hotel.rooms.length} room types available
                        </p>
                    </div>
                </div>

                {/* Rooms */}
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '1.5rem' }}>Available Rooms</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {hotel.rooms.map((room) => (
                            <RoomCard key={room._id} room={room} onBook={handleBookRoom} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            {showBookingModal && selectedRoom && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                    background: 'rgba(0, 0, 0, 0.75)',
                }}>
                    <div className="glass-card" style={{ padding: '2rem', maxWidth: '400px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>Book Room</h2>
                            <button onClick={() => setShowBookingModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.5rem' }}>
                                ✕
                            </button>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ fontWeight: 600, color: 'white' }}>{selectedRoom.name}</h3>
                            <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{hotel.name}</p>
                        </div>

                        {bookingError && (
                            <div style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.5)', color: '#f87171', padding: '0.75rem 1rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
                                {bookingError}
                            </div>
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div>
                                <label style={{ color: '#94a3b8', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Check In</label>
                                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} min={new Date().toISOString().split('T')[0]} className="input-field" required />
                            </div>
                            <div>
                                <label style={{ color: '#94a3b8', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Check Out</label>
                                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} min={checkIn || new Date().toISOString().split('T')[0]} className="input-field" required />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ color: '#94a3b8', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Adults</label>
                                    <select value={adults} onChange={(e) => setAdults(Number(e.target.value))} className="input-field">
                                        {[...Array(selectedRoom.capacity)].map((_, i) => (
                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ color: '#94a3b8', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Children</label>
                                    <select value={children} onChange={(e) => setChildren(Number(e.target.value))} className="input-field">
                                        {[...Array(Math.max(0, selectedRoom.capacity - adults) + 1)].map((_, i) => (
                                            <option key={i} value={i}>{i}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                <span>${selectedRoom.price} x {calculateTotalPrice() / selectedRoom.price || 0} nights</span>
                                <span>${calculateTotalPrice()}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white', fontWeight: 600, borderTop: '1px solid #374151', paddingTop: '0.5rem' }}>
                                <span>Total</span>
                                <span>${calculateTotalPrice()}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleConfirmBooking}
                            disabled={!checkIn || !checkOut || calculateTotalPrice() === 0 || isBooking}
                            className="btn-primary"
                            style={{ width: '100%', opacity: (!checkIn || !checkOut || calculateTotalPrice() === 0 || isBooking) ? 0.5 : 1 }}
                        >
                            {isBooking ? 'Processing...' : 'Confirm Booking'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
