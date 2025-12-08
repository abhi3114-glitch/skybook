import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Hotel } from './models/Hotel';

dotenv.config();

const sampleHotels = [
    {
        name: 'The Grand Azure Resort',
        description: 'Experience luxury at its finest with breathtaking ocean views, world-class amenities, and impeccable service. Our beachfront property offers the perfect escape for both relaxation and adventure.',
        location: 'Miami Beach, Florida',
        address: {
            street: '1500 Ocean Drive',
            city: 'Miami Beach',
            state: 'Florida',
            country: 'United States',
            zipCode: '33139'
        },
        rating: 4.8,
        reviews: 2847,
        images: [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
            'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
        ],
        amenities: ['Pool', 'Spa', 'Beach Access', 'Restaurant', 'Bar', 'Gym', 'Free WiFi', 'Parking', 'Room Service'],
        rooms: [
            {
                name: 'Deluxe Ocean View',
                description: 'Spacious room with stunning ocean views, king-size bed, and private balcony.',
                price: 299,
                capacity: 2,
                amenities: ['Ocean View', 'King Bed', 'Balcony', 'Mini Bar', 'Smart TV'],
                images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800']
            },
            {
                name: 'Premium Suite',
                description: 'Luxurious suite with separate living area, panoramic views, and exclusive amenities.',
                price: 549,
                capacity: 4,
                amenities: ['Panoramic View', 'Living Room', 'King Bed', 'Jacuzzi', 'Butler Service'],
                images: ['https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800']
            },
            {
                name: 'Standard Room',
                description: 'Comfortable room with modern amenities and city views.',
                price: 179,
                capacity: 2,
                amenities: ['City View', 'Queen Bed', 'Work Desk', 'Smart TV'],
                images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800']
            }
        ]
    },
    {
        name: 'Mountain Peak Lodge',
        description: 'Nestled in the heart of the Rockies, our lodge offers unparalleled mountain experiences with rustic charm and modern comfort. Perfect for ski enthusiasts and nature lovers.',
        location: 'Aspen, Colorado',
        address: {
            street: '500 Highland Road',
            city: 'Aspen',
            state: 'Colorado',
            country: 'United States',
            zipCode: '81611'
        },
        rating: 4.7,
        reviews: 1523,
        images: [
            'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
            'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800'
        ],
        amenities: ['Ski-in/Ski-out', 'Fireplace', 'Hot Tub', 'Restaurant', 'Bar', 'Spa', 'Free WiFi', 'Ski Storage'],
        rooms: [
            {
                name: 'Mountain View Suite',
                description: 'Cozy suite with fireplace, mountain views, and ski-in/ski-out access.',
                price: 449,
                capacity: 4,
                amenities: ['Mountain View', 'Fireplace', 'Kitchen', 'Private Hot Tub'],
                images: ['https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800']
            },
            {
                name: 'Deluxe Cabin Room',
                description: 'Rustic cabin-style room with modern amenities and forest views.',
                price: 289,
                capacity: 2,
                amenities: ['Forest View', 'King Bed', 'Fireplace', 'Coffee Maker'],
                images: ['https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800']
            }
        ]
    },
    {
        name: 'City Lights Hotel',
        description: 'Modern luxury in the heart of Manhattan. Walking distance to Times Square, Central Park, and world-famous attractions. The ultimate New York experience.',
        location: 'New York City, New York',
        address: {
            street: '123 Broadway',
            city: 'New York',
            state: 'New York',
            country: 'United States',
            zipCode: '10019'
        },
        rating: 4.5,
        reviews: 4521,
        images: [
            'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
            'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
            'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800'
        ],
        amenities: ['Rooftop Bar', 'Restaurant', 'Gym', 'Business Center', 'Free WiFi', 'Concierge', 'Valet Parking'],
        rooms: [
            {
                name: 'Executive King',
                description: 'Sophisticated room with city skyline views and premium amenities.',
                price: 399,
                capacity: 2,
                amenities: ['Skyline View', 'King Bed', 'Work Desk', 'Nespresso Machine'],
                images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800']
            },
            {
                name: 'Times Square Suite',
                description: 'Luxurious suite overlooking Times Square with living room and dining area.',
                price: 799,
                capacity: 4,
                amenities: ['Times Square View', 'Living Room', 'Dining Area', 'Butler Service'],
                images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800']
            },
            {
                name: 'Cozy Queen',
                description: 'Comfortable room perfect for solo travelers or couples.',
                price: 249,
                capacity: 2,
                amenities: ['City View', 'Queen Bed', 'Smart TV', 'Mini Fridge'],
                images: ['https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=800']
            }
        ]
    },
    {
        name: 'Tropical Paradise Resort',
        description: 'Your private island escape in the Hawaiian islands. Crystal clear waters, pristine beaches, and authentic Polynesian hospitality await.',
        location: 'Maui, Hawaii',
        address: {
            street: '2000 Wailea Beach Road',
            city: 'Wailea',
            state: 'Hawaii',
            country: 'United States',
            zipCode: '96753'
        },
        rating: 4.9,
        reviews: 3156,
        images: [
            'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800',
            'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
            'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800'
        ],
        amenities: ['Private Beach', 'Multiple Pools', 'Spa', 'Golf Course', 'Water Sports', 'Luau', 'Free WiFi', 'Kids Club'],
        rooms: [
            {
                name: 'Oceanfront Bungalow',
                description: 'Private bungalow steps from the ocean with outdoor shower and hammock.',
                price: 699,
                capacity: 2,
                amenities: ['Beachfront', 'Private Patio', 'Outdoor Shower', 'Hammock'],
                images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800']
            },
            {
                name: 'Family Villa',
                description: 'Spacious villa perfect for families with full kitchen and private pool.',
                price: 999,
                capacity: 6,
                amenities: ['Private Pool', 'Kitchen', 'Garden', 'BBQ Area', 'Kids Play Area'],
                images: ['https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800']
            },
            {
                name: 'Garden View Room',
                description: 'Peaceful room surrounded by tropical gardens with easy beach access.',
                price: 349,
                capacity: 2,
                amenities: ['Garden View', 'King Bed', 'Lanai', 'Mini Bar'],
                images: ['https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800']
            }
        ]
    },
    {
        name: 'Historic Downtown Inn',
        description: 'Charming boutique hotel in a restored 19th-century building. Experience Southern hospitality with modern comforts in the heart of Charleston.',
        location: 'Charleston, South Carolina',
        address: {
            street: '75 King Street',
            city: 'Charleston',
            state: 'South Carolina',
            country: 'United States',
            zipCode: '29401'
        },
        rating: 4.6,
        reviews: 892,
        images: [
            'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
            'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
            'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800'
        ],
        amenities: ['Courtyard Garden', 'Complimentary Breakfast', 'Wine Hour', 'Free WiFi', 'Concierge', 'Bikes'],
        rooms: [
            {
                name: 'Carriage House Suite',
                description: 'Romantic suite in the historic carriage house with private entrance.',
                price: 329,
                capacity: 2,
                amenities: ['Private Entrance', 'Four-Poster Bed', 'Clawfoot Tub', 'Fireplace'],
                images: ['https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800']
            },
            {
                name: 'Classic Queen',
                description: 'Elegant room with antique furnishings and courtyard views.',
                price: 199,
                capacity: 2,
                amenities: ['Courtyard View', 'Queen Bed', 'Antique Decor', 'Coffee Service'],
                images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800']
            }
        ]
    },
    {
        name: 'Desert Oasis Spa Resort',
        description: 'A sanctuary of wellness and relaxation in the Sonoran Desert. Rejuvenate with world-class spa treatments, yoga retreats, and stargazing.',
        location: 'Scottsdale, Arizona',
        address: {
            street: '8700 E Princess Drive',
            city: 'Scottsdale',
            state: 'Arizona',
            country: 'United States',
            zipCode: '85255'
        },
        rating: 4.7,
        reviews: 1876,
        images: [
            'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800',
            'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=800',
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
        ],
        amenities: ['Full-Service Spa', 'Yoga Studio', 'Meditation Garden', 'Pool', 'Healthy Dining', 'Tennis', 'Free WiFi'],
        rooms: [
            {
                name: 'Wellness Suite',
                description: 'Designed for relaxation with in-room yoga space and desert views.',
                price: 429,
                capacity: 2,
                amenities: ['Desert View', 'Yoga Mat', 'Meditation Cushions', 'Aromatherapy'],
                images: ['https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800']
            },
            {
                name: 'Casita',
                description: 'Private adobe-style casita with outdoor living space and fire pit.',
                price: 599,
                capacity: 4,
                amenities: ['Private Patio', 'Fire Pit', 'Outdoor Shower', 'Kitchen'],
                images: ['https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800']
            },
            {
                name: 'Standard Desert Room',
                description: 'Comfortable room with southwest decor and mountain views.',
                price: 249,
                capacity: 2,
                amenities: ['Mountain View', 'King Bed', 'Patio', 'Coffee Maker'],
                images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800']
            }
        ]
    },
    {
        name: 'Lakeside Retreat',
        description: 'Peaceful lakefront property surrounded by pine forests. Perfect for fishing, kayaking, and reconnecting with nature.',
        location: 'Lake Tahoe, California',
        address: {
            street: '300 Lakeshore Boulevard',
            city: 'South Lake Tahoe',
            state: 'California',
            country: 'United States',
            zipCode: '96150'
        },
        rating: 4.4,
        reviews: 723,
        images: [
            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
            'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800',
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
        ],
        amenities: ['Private Beach', 'Kayaks', 'Fishing', 'Fire Pit', 'BBQ', 'Free WiFi', 'Hiking Trails'],
        rooms: [
            {
                name: 'Lakefront Cabin',
                description: 'Charming cabin directly on the lake with private dock.',
                price: 399,
                capacity: 4,
                amenities: ['Lake View', 'Private Dock', 'Fireplace', 'Full Kitchen'],
                images: ['https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800']
            },
            {
                name: 'Forest View Suite',
                description: 'Cozy suite surrounded by towering pines with modern amenities.',
                price: 279,
                capacity: 2,
                amenities: ['Forest View', 'King Bed', 'Hot Tub', 'Fireplace'],
                images: ['https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800']
            }
        ]
    },
    {
        name: 'The Metropolitan',
        description: 'Sleek, contemporary hotel in the heart of San Francisco. Tech-forward amenities meet sophisticated design with Bay views.',
        location: 'San Francisco, California',
        address: {
            street: '50 Third Street',
            city: 'San Francisco',
            state: 'California',
            country: 'United States',
            zipCode: '94103'
        },
        rating: 4.3,
        reviews: 2134,
        images: [
            'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
            'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800',
            'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800'
        ],
        amenities: ['Rooftop Lounge', 'Tech Hub', 'Restaurant', 'Gym', 'EV Charging', 'Free WiFi', 'Co-Working Space'],
        rooms: [
            {
                name: 'Bay View King',
                description: 'Modern room with floor-to-ceiling windows and Bay Bridge views.',
                price: 359,
                capacity: 2,
                amenities: ['Bay View', 'King Bed', 'Smart Home', 'Work Station'],
                images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800']
            },
            {
                name: 'Tech Suite',
                description: 'Perfect for digital nomads with dedicated office and meeting space.',
                price: 499,
                capacity: 2,
                amenities: ['Private Office', 'Video Conference Setup', 'Ergonomic Chair', 'Standing Desk'],
                images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800']
            },
            {
                name: 'Urban Double',
                description: 'Compact but stylish room ideal for short stays.',
                price: 199,
                capacity: 2,
                amenities: ['City View', 'Double Bed', 'Smart TV', 'Rain Shower'],
                images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800']
            }
        ]
    },
    {
        name: 'Vineyard Estate Hotel',
        description: 'Elegant estate in the heart of Napa Valley wine country. Tasting experiences, gourmet dining, and romantic getaways.',
        location: 'Napa Valley, California',
        address: {
            street: '1234 Silverado Trail',
            city: 'Napa',
            state: 'California',
            country: 'United States',
            zipCode: '94558'
        },
        rating: 4.8,
        reviews: 1456,
        images: [
            'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
            'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800',
            'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800'
        ],
        amenities: ['Wine Tasting', 'Vineyard Tours', 'Fine Dining', 'Spa', 'Pool', 'Bikes', 'Free WiFi', 'Hot Air Balloons'],
        rooms: [
            {
                name: 'Vineyard View Suite',
                description: 'Luxurious suite overlooking rolling vineyards with private terrace.',
                price: 549,
                capacity: 2,
                amenities: ['Vineyard View', 'Private Terrace', 'Soaking Tub', 'Wine Fridge'],
                images: ['https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800']
            },
            {
                name: 'Garden Cottage',
                description: 'Charming cottage surrounded by rose gardens and olive trees.',
                price: 429,
                capacity: 2,
                amenities: ['Garden', 'Fireplace', 'King Bed', 'Breakfast Included'],
                images: ['https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800']
            },
            {
                name: 'Classic Room',
                description: 'Elegant room with French country decor and garden views.',
                price: 299,
                capacity: 2,
                amenities: ['Garden View', 'Queen Bed', 'Coffee Service', 'Complimentary Wine'],
                images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800']
            }
        ]
    },
    {
        name: 'Seaside Cliff Hotel',
        description: 'Dramatic cliffside property with stunning Pacific Ocean views. Watch whales migrate, explore tide pools, and enjoy fresh seafood.',
        location: 'Big Sur, California',
        address: {
            street: 'Highway 1',
            city: 'Big Sur',
            state: 'California',
            country: 'United States',
            zipCode: '93920'
        },
        rating: 4.6,
        reviews: 678,
        images: [
            'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800',
            'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
            'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800'
        ],
        amenities: ['Ocean Views', 'Restaurant', 'Hiking Trails', 'Massage', 'Free WiFi', 'Star Gazing Deck'],
        rooms: [
            {
                name: 'Cliffside Suite',
                description: 'Breathtaking suite perched on the cliff with panoramic ocean views.',
                price: 649,
                capacity: 2,
                amenities: ['Ocean View', 'Private Deck', 'Telescope', 'Fireplace', 'Jacuzzi'],
                images: ['https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800']
            },
            {
                name: 'Ocean View Room',
                description: 'Comfortable room with stunning Pacific views and modern amenities.',
                price: 379,
                capacity: 2,
                amenities: ['Ocean View', 'King Bed', 'Binoculars', 'Coffee Maker'],
                images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800']
            }
        ]
    }
];

async function seedDatabase() {
    try {
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/skybook';

        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing hotels
        await Hotel.deleteMany({});
        console.log('Cleared existing hotels');

        // Insert sample hotels
        const result = await Hotel.insertMany(sampleHotels);
        console.log(`Inserted ${result.length} hotels successfully!`);

        // Display created hotels
        console.log('\nCreated Hotels:');
        result.forEach((hotel, index) => {
            console.log(`${index + 1}. ${hotel.name} - ${hotel.location} (${hotel.rooms.length} rooms)`);
        });

        await mongoose.disconnect();
        console.log('\nDatabase seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
