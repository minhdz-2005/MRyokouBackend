const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Email đã tồn tại' });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({ fullname, email, password: hashed });

    res.status(201).json({ message: 'Đăng ký thành công', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server' });
    console.error(err)
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Sai email hoặc mật khẩu' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Sai email hoặc mật khẩu' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Đăng nhập thành công',
      token,
      user: { id: user._id, fullname: user.fullname, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};
