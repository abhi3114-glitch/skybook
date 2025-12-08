import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { hotelsApi } from '../services/api';
import type { Hotel, SearchFilters } from '../types';
import HotelCard from '../components/hotel/HotelCard';

export default function Hotels() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [location, setLocation] = useState(searchParams.get('location') || '');
    const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
    const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
    const [rating, setRating] = useState(searchParams.get('rating') || '');

    useEffect(() => {
        fetchHotels();
    }, [searchParams]);

    const fetchHotels = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const filters: SearchFilters = {};
            const loc = searchParams.get('location');
            const min = searchParams.get('minPrice');
            const max = searchParams.get('maxPrice');
            const rat = searchParams.get('rating');

            if (loc) filters.location = loc;
            if (min) filters.minPrice = Number(min);
            if (max) filters.maxPrice = Number(max);
            if (rat) filters.rating = Number(rat);

            const data = await hotelsApi.getAll(filters);
            setHotels(data);
        } catch (err) {
            setError('Failed to load hotels. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (location) params.set('location', location);
        if (minPrice) params.set('minPrice', minPrice);
        if (maxPrice) params.set('maxPrice', maxPrice);
        if (rating) params.set('rating', rating);
        setSearchParams(params);
    };

    const clearFilters = () => {
        setLocation('');
        setMinPrice('');
        setMaxPrice('');
        setRating('');
        setSearchParams({});
    };

    return (
        <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1rem' }}>
                {/* Header */}
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
                        {searchParams.get('location')
                            ? `Hotels in ${searchParams.get('location')}`
                            : 'All Hotels'}
                    </h1>
                    <p style={{ color: '#94a3b8' }}>
                        {hotels.length} {hotels.length === 1 ? 'hotel' : 'hotels'} found
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem', flexWrap: 'wrap' }}>
                    {/* Filters Sidebar */}
                    <aside style={{ width: '280px', flexShrink: 0 }}>
                        <form onSubmit={handleFilter} className="glass-card" style={{ padding: '1.5rem', position: 'sticky', top: '96px' }}>
                            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'white', marginBottom: '1.5rem' }}>
                                Filters
                            </h2>

                            <div style={{ marginBottom: '1.25rem' }}>
                                <label style={{ color: '#94a3b8', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                                    Location
                                </label>
                                <input
                                    type="text"
                                    placeholder="City or area..."
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="input-field"
                                />
                            </div>

                            <div style={{ marginBottom: '1.25rem' }}>
                                <label style={{ color: '#94a3b8', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                                    Price Range (per night)
                                </label>
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                        className="input-field"
                                        min="0"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        className="input-field"
                                        min="0"
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ color: '#94a3b8', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                                    Minimum Rating
                                </label>
                                <select
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    className="input-field"
                                >
                                    <option value="">Any rating</option>
                                    <option value="3">3+ stars</option>
                                    <option value="4">4+ stars</option>
                                    <option value="4.5">4.5+ stars</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                                    Apply
                                </button>
                                <button type="button" onClick={clearFilters} className="btn-secondary">
                                    Clear
                                </button>
                            </div>
                        </form>
                    </aside>

                    {/* Hotels Grid */}
                    <main style={{ flex: 1, minWidth: 0 }}>
                        {isLoading ? (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="glass-card" style={{ overflow: 'hidden' }}>
                                        <div className="skeleton" style={{ height: '192px' }} />
                                        <div style={{ padding: '1.25rem' }}>
                                            <div className="skeleton" style={{ height: '24px', width: '75%', marginBottom: '0.75rem' }} />
                                            <div className="skeleton" style={{ height: '16px', width: '50%', marginBottom: '0.75rem' }} />
                                            <div className="skeleton" style={{ height: '16px', width: '100%', marginBottom: '0.75rem' }} />
                                            <div className="skeleton" style={{ height: '40px', width: '33%' }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : error ? (
                            <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚠️</div>
                                <p style={{ color: '#f87171', marginBottom: '1rem' }}>{error}</p>
                                <button onClick={fetchHotels} className="btn-primary">Try Again</button>
                            </div>
                        ) : hotels.length === 0 ? (
                            <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏨</div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white', marginBottom: '0.5rem' }}>
                                    No hotels found
                                </h3>
                                <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>
                                    Try adjusting your filters or search criteria
                                </p>
                                <button onClick={clearFilters} className="btn-secondary">Clear Filters</button>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                {hotels.map((hotel) => (
                                    <HotelCard key={hotel._id} hotel={hotel} />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
