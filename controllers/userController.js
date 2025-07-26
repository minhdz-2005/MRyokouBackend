const User = require('../models/User');

// [CREATE] Tạo mới người dùng
exports.createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();

        // Ẩn password khi trả về
        const { password, ...userWithoutPassword } = savedUser._doc;
        res.status(201).json(userWithoutPassword);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// [READ ALL] Lấy danh sách tất cả người dùng
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // không trả password
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// [READ ONE] Lấy người dùng theo ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// [READ ONE] Lấy người dùng theo email
exports.getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email }).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found with this email' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// [UPDATE] Cập nhật người dùng an toàn
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Chỉ cập nhật những trường được gửi lên
        if (req.body.fullname !== undefined) user.fullname = req.body.fullname;
        if (req.body.email !== undefined) user.email = req.body.email;
        if (req.body.password !== undefined) user.password = req.body.password;

        const updatedUser = await user.save();
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


// [DELETE] Xóa người dùng
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
