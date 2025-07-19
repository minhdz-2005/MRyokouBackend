const TourDetail = require('../models/TourDetail');

/* ───────────── GET /api/tour-details ───────────── */
exports.getAllTourDetails = async (req, res) => {
  try {
    const tourDetails = await TourDetail.find().populate('tour');
    res.json(tourDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

/* ───────────── GET /api/tour-details/:tourId ───────────── */
exports.getTourDetailByTourId = async (req, res) => {
  try {
    const tourDetail = await TourDetail.findOne({ tour: req.params.tourId }).populate('tour');
    if (!tourDetail)
      return res.status(404).json({ message: 'Không tìm thấy chi tiết tour' });
    res.json(tourDetail);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

/* ───────────── POST /api/tour-details ───────────── */
exports.createTourDetail = async (req, res) => {
  try {
    const newTourDetail = await TourDetail.create(req.body);
    res.status(201).json(newTourDetail);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Dữ liệu chi tiết tour không hợp lệ' });
  }
};

/* ───────────── PUT /api/tour-details/:id ───────────── */
exports.updateTourDetail = async (req, res) => {
  try {
    const tourDetail = await TourDetail.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!tourDetail)
      return res.status(404).json({ message: 'Không tìm thấy chi tiết tour' });
    res.json(tourDetail);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Cập nhật thất bại' });
  }
};

/* ───────────── DELETE /api/tour-details/:id ───────────── */
exports.deleteTourDetail = async (req, res) => {
  try {
    const tourDetail = await TourDetail.findByIdAndDelete(req.params.id);
    if (!tourDetail)
      return res.status(404).json({ message: 'Không tìm thấy chi tiết tour' });
    res.json({ message: 'Đã xoá chi tiết tour' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Xoá thất bại' });
  }
};
