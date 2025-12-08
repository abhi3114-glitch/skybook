import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Booking } from '../models/Booking';
import { Hotel } from '../models/Hotel';
import mongoose from 'mongoose';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to verify JWT token
const authenticateToken = async (req: Request, res: Response, next: any) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Validate booking dates middleware
const validateBookingDates = (req: Request, res: Response, next: any) => {
  const { checkIn, checkOut } = req.body;
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
    return res.status(400).json({ message: 'Invalid dates provided' });
  }

  if (checkInDate < new Date()) {
    return res.status(400).json({ message: 'Check-in date cannot be in the past' });
  }

  if (checkOutDate <= checkInDate) {
    return res.status(400).json({ message: 'Check-out date must be after check-in date' });
  }

  next();
};

// Create new booking
router.post('/', authenticateToken, validateBookingDates, async (req: Request, res: Response) => {
  try {
    const {
      userId,
      hotelId,
      roomId,
      checkIn,
      checkOut,
      guests,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
      return res.status(400).json({ message: 'Invalid hotel ID' });
    }

    // Validate hotel and room
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    const room = hotel.rooms.find(r => r._id.toString() === roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Check if room is available for the dates
    const existingBooking = await Booking.findOne({
      hotel: hotelId,
      'room.id': room._id,
      status: { $ne: 'cancelled' },
      $or: [
        {
          checkIn: { $lte: new Date(checkOut) },
          checkOut: { $gte: new Date(checkIn) }
        }
      ]
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Room is not available for the selected dates' });
    }

    // Validate guest count
    if (guests.adults + guests.children > room.capacity) {
      return res.status(400).json({ 
        message: `Room capacity exceeded. Maximum capacity is ${room.capacity} guests.`
      });
    }

    // Calculate total price
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = room.price * nights;

    // Create booking
    const booking = new Booking({
      user: userId,
      hotel: hotelId,
      room: {
        id: room._id,
        name: room.name,
        price: room.price,
      },
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      totalPrice,
    });

    await booking.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: 'Error creating booking', error });
  }
});

// Get user's bookings
router.get('/my-bookings', authenticateToken, async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find({ user: req.body.userId })
      .populate('hotel', 'name location images')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
});

// Get booking by ID
router.get('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid booking ID' });
    }

    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.body.userId,
    }).populate('hotel', 'name location images');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking', error });
  }
});

// Cancel booking
router.put('/:id/cancel', authenticateToken, async (req: Request, res: Response) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid booking ID' });
    }

    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.body.userId,
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking is already cancelled' });
    }

    // Check if cancellation is allowed (e.g., not too close to check-in date)
    const now = new Date();
    const checkIn = new Date(booking.checkIn);
    const hoursUntilCheckIn = (checkIn.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursUntilCheckIn < 24) {
      return res.status(400).json({ message: 'Cancellation is not allowed within 24 hours of check-in' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: 'Error cancelling booking', error });
  }
});

export const bookingRoutes = router; 