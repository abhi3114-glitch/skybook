import mongoose, { Document, Schema } from 'mongoose';

export interface IRoom extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  capacity: number;
  amenities: string[];
  images: string[];
}

export interface IHotel extends Document {
  name: string;
  description: string;
  location: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  rating: number;
  reviews: number;
  images: string[];
  amenities: string[];
  rooms: IRoom[];
  createdAt: Date;
  updatedAt: Date;
}

const roomSchema = new Schema<IRoom>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  capacity: { type: Number, required: true },
  amenities: [{ type: String }],
  images: [{ type: String }],
}, { _id: true }); // Explicitly enable _id for subdocuments

const hotelSchema = new Schema<IHotel>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    images: [{ type: String }],
    amenities: [{ type: String }],
    rooms: [roomSchema],
  },
  {
    timestamps: true,
  }
);

// Add indexes for better query performance
hotelSchema.index({ location: 1 });
hotelSchema.index({ 'rooms.price': 1 });
hotelSchema.index({ rating: -1 });

export const Hotel = mongoose.model<IHotel>('Hotel', hotelSchema); 