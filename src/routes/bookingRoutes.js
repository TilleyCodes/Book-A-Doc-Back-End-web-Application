const express = require('express');

const bookingRouter = express.Router();

const {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingController');

const errorHandler = require('../middleware/errorHandler');

// GET ALL | http://localhost:3000/bookings
bookingRouter.get('/', errorHandler(async (req, res) => {
  const bookings = await getBookings();
  res.status(200).json(bookings);
}));

// GET ONE | http://localhost:3000/bookings/bookingId
bookingRouter.get('/:bookingId', errorHandler(async (req, res) => {
  const booking = await getBooking(req.params.bookingId);
  if (!booking) {
    res.status(404).json({ error: `Booking with id: ${req.params.bookingId} does not exist` });
  }
  res.status(200).json(booking);
}));

// CREATE | http://localhost:3000/bookings
bookingRouter.post('/', errorHandler(async (req, res) => {
  const newBooking = await createBooking(req.body);
  res.status(201).json(newBooking);
}));

// UPDATE | http://localhost:3000/bookings/bookingId
bookingRouter.patch('/:bookingId', errorHandler(async (req, res) => {
  const { bookingId } = req.params;
  const updatedBooking = await updateBooking(bookingId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedBooking) {
    res.status(404).json({ error: `Booking with id: ${req.params.bookingId} does not exist` });
  }
  res.status(200).json(updatedBooking);
}));

// DELETE | http://localhost:3000/bookings/bookingId
bookingRouter.delete('/:bookingId', errorHandler(async (req, res) => {
  const deletedBooking = await deleteBooking(req.params.bookingId);
  if (!deletedBooking) {
    res.status(404).json({ error: `Booking with id: ${req.params.bookingId} does not exist` });
  }
  res.status(200).json(deletedBooking);
}));

module.exports = bookingRouter;
