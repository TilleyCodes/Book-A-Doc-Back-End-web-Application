const Booking = require('../models/booking');

// GET ALL data from Booking model db
async function getBookings() {
  const bookings = await Booking.find()
    .populate('patientId', 'firstName lastName')
    .populate('doctorId', 'doctorName')
    .populate('availabilityId', 'date startTime endTime')
    .sort({ createdAt: -1 });
  return bookings;
}

// GET ONE Booking by ID
async function getBooking(id) {
  const booking = await Booking.findById(id)
    .populate('patientId', 'firstName lastName')
    .populate('doctorId', 'doctorName')
    .populate('availabilityId', 'date startTime endTime');
    
  if (!booking) {
    const error = new Error(`Booking with id ${id} not found`);
    error.status = 404;
    throw error;
  }
  return booking;
}

// CREATE data from Booking model db
async function createBooking(data) {
  try {
    const newBooking = await Booking.create(data);
    return newBooking;
  } catch (error) {
    if (error.name === 'ValidationError') {
      error.status = 400;
    }
    throw error;
  }
}

// UPDATE data from Booking model db
async function updateBooking(id, data) {
  const updatedBooking = await Booking.findByIdAndUpdate(
    id,
    data,
    { new: true, runValidators: true }
  );

  if (!updatedBooking) {
    const error = new Error(`Booking with id ${id} not found`);
    error.status = 404;
    throw error;
  }
  return updatedBooking;
}

// DELETE data from Booking model db
async function deleteBooking(id) {
  const deletedBooking = await Booking.findByIdAndDelete(id);
  if (!deletedBooking) {
    const error = new Error(`Booking with id ${id} not found`);
    error.status = 404;
    throw error;
  }
  return deletedBooking;
}

module.exports = {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
};
