const Tour = require('../models/Tour');
const TourDetail = require('../models/TourDetail');

/* ───────────── GET /api/tours?page=1&limit=8&sort=price-asc ───────────── */
exports.getAllTours = async (req, res) => {
  try {
    const page  = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 6;
    const sort  = req.query.sort || '';
    const keyword = req.query.keyword || '';         // Từ khóa
    const location = req.query.location || '';       // Địa điểm
    const priceRange = req.query.price || '';        // Mức giá
    const durationRange = req.query.duration || '';

    const skip  = (page - 1) * limit;

    // ───── Build query động ─────
    let query = {};

    if (keyword) {
      query.title = { $regex: keyword, $options: 'i' };
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (priceRange) {
      if (priceRange === 'low') query.price = { $lt: 3000000 };
      else if (priceRange === 'mid') query.price = { $gte: 3000000, $lte: 5000000 };
      else if (priceRange === 'high') query.price = { $gt: 5000000 };
      else if (priceRange === 'luxury') query.price = { $gt: 10000000 };
    }

    if (durationRange) {
      if (durationRange === '1-3') query.duration = { $gte: 1, $lte: 3 };
      if (durationRange === '4-7') query.duration = { $gte: 4, $lte: 7 };
      if (durationRange === '8+') query.duration = { $gt: 8 };
    }

    // Tìm theo ngày đi


    // ───── Sort option ─────
    let sortOption = {};
    switch (sort) {
      case 'price-asc':
        sortOption.price = 1;
        break;
      case 'price-desc':
        sortOption.price = -1;
        break;
      case 'rating':
        sortOption.rating = -1;
        break;
      case 'newest':
        sortOption.createdAt = -1;
        break;
    }

    const [tours, total] = await Promise.all([
      Tour.find(query).sort(sortOption).skip(skip).limit(limit),
      Tour.countDocuments(query),
    ]);

    res.json({
      page,
      totalPages: Math.ceil(total / limit),
      total,
      data: tours,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

/* ───────────── GET /api/tours/:id ───────────── */
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: 'Không tìm thấy tour' });
    res.json(tour);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

/* ───────────── POST /api/tours ───────────── */
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json(newTour);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Dữ liệu tour không hợp lệ' });
  }
};

/* ───────────── PUT /api/tours/:id ───────────── */
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!tour) return res.status(404).json({ message: 'Không tìm thấy tour' });
    res.json(tour);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Cập nhật thất bại' });
  }
};

/* ───────────── DELETE /api/tours/:id ───────────── */
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) return res.status(404).json({ message: 'Không tìm thấy tour' });
    res.json({ message: 'Đã xoá tour' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Xoá thất bại' });
  }
};
