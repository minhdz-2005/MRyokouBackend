const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema (
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        avatar: {
            type: String,
        },
        description: {
            type: String,
        },
        country: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        rating: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Rating',
        }
    }
);

module.exports = mongoose.model('Account', accountSchema);