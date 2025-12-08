import { Link } from 'react-router-dom';
import type { Hotel } from '../../types';

interface HotelCardProps {
    hotel: Hotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
    const minPrice = Math.min(...hotel.rooms.map((r) => r.price));

    return (
        <Link to={`/hotels/${hotel._id}`} style={{ textDecoration: 'none' }}>
            <div
                className="glass-card"
                style={{ overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}
            >
                {/* Image */}
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                    <img
                        src={hotel.images[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'}
                        alt={hotel.name}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.5s',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                    {/* Rating Badge */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '0.75rem',
                            right: '0.75rem',
                            background: '#3b82f6',
                            color: 'white',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '0.375rem',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                        }}
                    >
                        {hotel.rating.toFixed(1)} ★
                    </div>
                </div>

                {/* Content */}
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3
                        style={{
                            fontSize: '1.125rem',
                            fontWeight: 600,
                            color: 'white',
                            marginBottom: '0.5rem',
                            lineHeight: 1.3,
                        }}
                    >
                        {hotel.name}
                    </h3>

                    <p
                        style={{
                            color: '#94a3b8',
                            fontSize: '0.875rem',
                            marginBottom: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                        }}
                    >
                        📍 {hotel.location}
                    </p>

                    <p
                        style={{
                            color: '#64748b',
                            fontSize: '0.75rem',
                            marginBottom: '1rem',
                        }}
                    >
                        {hotel.reviews.toLocaleString()} reviews
                    </p>

                    {/* Amenities */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                        {hotel.amenities.slice(0, 3).map((amenity) => (
                            <span
                                key={amenity}
                                style={{
                                    background: 'rgba(59, 130, 246, 0.15)',
                                    color: '#93c5fd',
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '9999px',
                                    fontSize: '0.75rem',
                                }}
                            >
                                {amenity}
                            </span>
                        ))}
                        {hotel.amenities.length > 3 && (
                            <span
                                style={{
                                    background: 'rgba(148, 163, 184, 0.1)',
                                    color: '#94a3b8',
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '9999px',
                                    fontSize: '0.75rem',
                                }}
                            >
                                +{hotel.amenities.length - 3}
                            </span>
                        )}
                    </div>

                    {/* Price */}
                    <div style={{ marginTop: 'auto' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>
                            ${minPrice}
                        </span>
                        <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}> /night</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
