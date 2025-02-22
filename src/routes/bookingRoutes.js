const express = require('express');

const bookingRouter = express.Router();

const {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingController');

// GET ALL | http://localhost:3000/bookings
bookingRouter.get('/', async (req, res) => {
  try {
    const bookings = await getBookings();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ONE | http://localhost:3000/bookings/bookingId
bookingRouter.get('/:bookingId', async (req, res) => {
  const booking = await getBooking(req.params.bookingId);
  if (booking) {
    res.status(200).json(booking);
  } else {
    res.status(404).json({ error: `Booking with id: ${req.params.bookingId} does not exist` });
  }
});

// CREATE | http://localhost:3000/bookings
bookingRouter.post('/', async (req, res) => {
  try {
    const newBooking = await createBooking(req.body);
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE | http://localhost:3000/bookings/bookingId
bookingRouter.patch('/:bookingId', async (req, res) => {
  try {
    const { bookingId } = req.params;
    const updatedBooking = await updateBooking(bookingId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBooking) {
      res.status(404).json({ error: `Booking with id: ${req.params.bookingId} does not exist` });
    }
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE | http://localhost:3000/bookings/bookingId
bookingRouter.delete('/:bookingId', async (req, res) => {
  try {
    const deletedBooking = await deleteBooking(req.params.bookingId);
    if (!deletedBooking) {
      res.status(404).json({ error: `Booking with id: ${req.params.bookingId} does not exist` });
    }
    res.status(200).json(deletedBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = bookingRouter;
