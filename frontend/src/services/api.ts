import axios from 'axios';
import type {
    Hotel,
    Booking,
    AuthResponse,
    LoginCredentials,
    RegisterData,
    CreateBookingData,
    User,
    SearchFilters
} from '../types';

// Create axios instance
const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authApi = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const { data } = await api.post<AuthResponse>('/users/login', credentials);
        return data;
    },

    register: async (userData: RegisterData): Promise<AuthResponse> => {
        const { data } = await api.post<AuthResponse>('/users/register', userData);
        return data;
    },

    getProfile: async (): Promise<User> => {
        const { data } = await api.get<User>('/users/profile');
        return data;
    },

    updateProfile: async (userData: Partial<User>): Promise<{ user: User }> => {
        const { data } = await api.put<{ user: User }>('/users/profile', userData);
        return data;
    },
};

// Hotels API
export const hotelsApi = {
    getAll: async (filters?: SearchFilters): Promise<Hotel[]> => {
        const params = new URLSearchParams();

        if (filters?.location) params.append('location', filters.location);
        if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
        if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
        if (filters?.rating) params.append('rating', filters.rating.toString());
        if (filters?.amenities?.length) params.append('amenities', filters.amenities.join(','));

        const { data } = await api.get<Hotel[]>(`/hotels?${params.toString()}`);
        return data;
    },

    getById: async (id: string): Promise<Hotel> => {
        const { data } = await api.get<Hotel>(`/hotels/${id}`);
        return data;
    },
};

// Bookings API
export const bookingsApi = {
    create: async (bookingData: CreateBookingData): Promise<Booking> => {
        const { data } = await api.post<Booking>('/bookings', bookingData);
        return data;
    },

    getMyBookings: async (): Promise<Booking[]> => {
        const { data } = await api.get<Booking[]>('/bookings/my-bookings');
        return data;
    },

    getById: async (id: string): Promise<Booking> => {
        const { data } = await api.get<Booking>(`/bookings/${id}`);
        return data;
    },

    cancel: async (id: string): Promise<Booking> => {
        const { data } = await api.put<Booking>(`/bookings/${id}/cancel`);
        return data;
    },
};

export default api;
