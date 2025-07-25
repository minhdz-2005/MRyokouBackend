const Account = require('../models/Account');

// CREATE account với avatar upload
exports.createAccount = async (req, res) => {
    try {
        const avatarPath = req.file ? req.file.path : null;
        const newAccount = new Account({
            ...req.body,
            avatar: avatarPath
        });
        const savedAccount = await newAccount.save();
        res.status(201).json(savedAccount);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


// [READ ALL] Lấy tất cả các account
exports.getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.find()
            .populate('userID')
            .populate('rating');
        res.status(200).json(accounts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// [READ ONE] Lấy account theo ID
exports.getAccountById = async (req, res) => {
    try {
        const account = await Account.findById(req.params.id)
            .populate('userID')
            .populate('rating');
        if (!account) return res.status(404).json({ message: 'Account not found' });
        res.status(200).json(account);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE account kèm avatar mới (nếu có)
exports.updateAccount = async (req, res) => {
    try {
        const avatarPath = req.file ? req.file.path : undefined;
        const updateData = {
            ...req.body
        };
        if (avatarPath) updateData.avatar = avatarPath;

        const updatedAccount = await Account.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true }
        );
        if (!updatedAccount) return res.status(404).json({ message: 'Account not found' });
        res.status(200).json(updatedAccount);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// [DELETE] Xóa account
exports.deleteAccount = async (req, res) => {
    try {
        const deletedAccount = await Account.findByIdAndDelete(req.params.id);
        if (!deletedAccount) return res.status(404).json({ message: 'Account not found' });
        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
