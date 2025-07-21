const mongoose = require('mongoose');

const ExploreSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        location: {
            type: String,
            require: true,
        },
        region: {
            type: String,
            require: true,
            enum: ['north', 'central', 'south'],
            default: 'north'
        },
        fullDesc: [{ type: String}],
        image: [{ type: String}],
    }
);

module.exports = mongoose.model('Explore', ExploreSchema);