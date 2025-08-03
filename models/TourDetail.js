const mongoose = require('mongoose');
const tourDetailSchema = new mongoose.Schema({
  tour: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true },
  image: [{ type: String}],
  highlights: [{ type: String }],
  itinerary: [{ type: String }],
  schedules: [
    {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      status: { type: String, enum: ['Còn chỗ', 'Hết chỗ', 'Sắp khởi hành'], default: 'Còn chỗ' },
    },
  ],
  notes: [{ type: String }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('TourDetail', tourDetailSchema);