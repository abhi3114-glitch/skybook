import type { Room } from '../../types';

interface RoomCardProps {
    room: Room;
    onBook: (room: Room) => void;
}

export default function RoomCard({ room, onBook }: RoomCardProps) {
    return (
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'row', gap: '1.5rem', padding: '1.5rem', flexWrap: 'wrap' }}>
            {/* Room Image */}
            <div style={{ width: '200px', height: '140px', borderRadius: '0.5rem', overflow: 'hidden', flexShrink: 0 }}>
                <img
                    src={room.images?.[0] || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400'}
                    alt={room.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>

            {/* Room Info */}
            <div style={{ flex: 1, minWidth: '200px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white', marginBottom: '0.5rem' }}>
                    {room.name}
                </h3>

                <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1rem', lineHeight: 1.6 }}>
                    {room.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '1rem' }}>
                    <span>👥 Up to {room.capacity} guests</span>
                    {room.amenities?.slice(0, 3).map((amenity) => (
                        <span key={amenity}>✓ {amenity}</span>
                    ))}
                </div>
            </div>

            {/* Price & Book */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', minWidth: '120px' }}>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white' }}>
                        ${room.price}
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>per night</div>
                </div>

                <button onClick={() => onBook(room)} className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
                    Book Now
                </button>
            </div>
        </div>
    );
}
