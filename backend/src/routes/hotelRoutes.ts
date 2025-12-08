import express from 'express';
import { Hotel } from '../models/Hotel';
import { Request, Response } from 'express';

const router = express.Router();

// Get all hotels with filters
router.get('/', async (req: Request, res: Response) => {
  try {
    const {
      location,
      minPrice,
      maxPrice,
      amenities,
      rating,
    } = req.query;

    const filter: any = {};

    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }

    if (minPrice || maxPrice) {
      filter['rooms.price'] = {};
      if (minPrice) filter['rooms.price'].$gte = Number(minPrice);
      if (maxPrice) filter['rooms.price'].$lte = Number(maxPrice);
    }

    if (amenities) {
      filter.amenities = { $all: (amenities as string).split(',') };
    }

    if (rating) {
      filter.rating = { $gte: Number(rating) };
    }

    const hotels = await Hotel.find(filter);
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotels', error });
  }
});

// Get hotel by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotel', error });
  }
});

// Create new hotel
router.post('/', async (req: Request, res: Response) => {
  try {
    const hotel = new Hotel(req.body);
    const savedHotel = await hotel.save();
    res.status(201).json(savedHotel);
  } catch (error) {
    res.status(400).json({ message: 'Error creating hotel', error });
  }
});

// Update hotel
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (error) {
    res.status(400).json({ message: 'Error updating hotel', error });
  }
});

// Delete hotel
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting hotel', error });
  }
});

export const hotelRoutes = router; 