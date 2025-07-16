const Tour = require('../models/Tour');

/**
 * @desc Trả về danh sách địa điểm có trong Tour, đếm số lượng Tour và chọn 1 ảnh
 * @route GET /api/explore/destinations
 */
exports.getDestinations = async (req, res) => {
  try {
    const destinations = await Tour.aggregate([
      {
        $group: {
          _id: '$location',
          totalTours: { $sum: 1 },
          image: { $first: '$image' }, // lấy 1 ảnh đại diện bất kỳ
        },
      },
      { $sort: { totalTours: -1 } }, // sắp xếp theo số lượng tour nhiều nhất
    ]);

    const formatted = destinations.map((d) => ({
      name: d._id,
      image: d.image,
      totalTours: d.totalTours,
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi server khi lấy địa điểm' });
  }
};
