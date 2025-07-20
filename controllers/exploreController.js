const Explore = require('../models/Explore');

// [POST] /api/explore
exports.createExplore = async (req, res) => {
  try {
    const newExplore = await Explore.create(req.body);
    res.status(201).json(newExplore);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// [GET] /api/explore
exports.getAllExplores = async (req, res) => {
  try {
    const explores = await Explore.find();
    res.status(200).json(explores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// [GET] /api/explore/region/:region
exports.getByRegion = async (req, res) => {
  try {
    const { region } = req.params;
    const explores = await Explore.find({ region });
    res.status(200).json(explores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// [PUT] /api/explore/:id
exports.updateExplore = async (req, res) => {
  try {
    const updated = await Explore.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// [DELETE] /api/explore/:id
exports.deleteExplore = async (req, res) => {
  try {
    await Explore.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Đã xoá địa điểm thành công!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
