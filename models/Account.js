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
    }
);

module.exports = mongoose.model('Account', accountSchema);