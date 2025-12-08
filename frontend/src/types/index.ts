// User Types
export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'user' | 'admin';
    phoneNumber?: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
}

// Hotel Types
export interface Room {
    _id: string;
    name: string;
    description: string;
    price: number;
    capacity: number;
    amenities: string[];
    images: string[];
}

export interface Address {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
}

export interface Hotel {
    _id: string;
    name: string;
    description: string;
    location: string;
    address: Address;
    rating: number;
    reviews: number;
    images: string[];
    amenities: string[];
    rooms: Room[];
    createdAt: string;
    updatedAt: string;
}

// Booking Types
export interface Guests {
    adults: number;
    children: number;
}

export interface BookingRoom {
    id: string;
    name: string;
    price: number;
}

export interface Booking {
    _id: string;
    user: string;
    hotel: Hotel | string;
    room: BookingRoom;
    checkIn: string;
    checkOut: string;
    guests: Guests;
    totalPrice: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    paymentStatus: 'pending' | 'completed' | 'failed';
    createdAt: string;
    updatedAt: string;
}

export interface CreateBookingData {
    hotelId: string;
    roomId: string;
    checkIn: string;
    checkOut: string;
    guests: Guests;
}

// Search Types
export interface SearchFilters {
    location?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: Guests;
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
    amenities?: string[];
}

// API Response Types
export interface ApiError {
    message: string;
    error?: unknown;
}
