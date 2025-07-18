const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const newBooking = await Booking.create(req.body);
    res.status(201).json(newBooking);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Dữ liệu đặt tour không hợp lệ' });
  }
};