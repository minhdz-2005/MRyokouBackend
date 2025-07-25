const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema(
    {
        tour: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking',
            require: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
            require: true,
        },
        star: {
            type: Number,
            default: 5,
            min: 0,
            max: 5,
        },
        tourRate: {
            type: String,
            default: 'Perfect',
        },
        serviceRate: {
            type: String,
            default: 'Perfect',
        },
    }
);

module.exports = mongoose.model('Rating', ratingSchema);