const Booking = require('../models/booking');

// GET ALL data from Booking model db
async function getBookings() {
  const bookings = await Booking.find();
  return bookings;
}

// GET ONE data from Booking model db
async function getBooking(id) {
  const booking = await Booking.findById(id);
  return booking;
}

// CREATE data from Booking model db
async function createBooking(data) {
  const newBooking = await Booking.create(data);
  return newBooking;
}

// UPDATE data from Booking model db
async function updateBooking(id, data, options = {}) {
  const updatedBooking = await Booking.findByIdAndUpdate(
    id,
    { $set: data }, // Allows partial update
    options,
  );
  return updatedBooking;
}

// DELETE data from Booking model db
async function deleteBooking(id) {
  const deletedBooking = await Booking.findByIdAndDelete(id);
  return deletedBooking;
}

module.exports = {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
};
