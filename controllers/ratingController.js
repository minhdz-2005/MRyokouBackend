const Rating = require('../models/Rating');

// [CREATE] Thêm đánh giá mới
exports.createRating = async (req, res) => {
    try {
        const newRating = new Rating(req.body);
        const savedRating = await newRating.save();
        res.status(201).json(savedRating);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// [READ ALL] Lấy tất cả các đánh giá
exports.getAllRatings = async (req, res) => {
    try {
        const ratings = await Rating.find()
            .populate('tour')
            .populate('user');
        res.status(200).json(ratings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// [READ ONE] Lấy một đánh giá theo ID
exports.getRatingById = async (req, res) => {
    try {
        const rating = await Rating.findById(req.params.id)
            .populate('tour')
            .populate('user');
        if (!rating) return res.status(404).json({ message: 'Rating not found' });
        res.status(200).json(rating);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// [UPDATE] Cập nhật đánh giá
exports.updateRating = async (req, res) => {
    try {
        const updatedRating = await Rating.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedRating) return res.status(404).json({ message: 'Rating not found' });
        res.status(200).json(updatedRating);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// [DELETE] Xóa đánh giá
exports.deleteRating = async (req, res) => {
    try {
        const deletedRating = await Rating.findByIdAndDelete(req.params.id);
        if (!deletedRating) return res.status(404).json({ message: 'Rating not found' });
        res.status(200).json({ message: 'Rating deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
