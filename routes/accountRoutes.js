const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const upload = require('../middlewares/upload');

/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: Quản lý tài khoản người dùng
 */

/**
 * @swagger
 * /api/accounts:
 *   post:
 *     summary: Tạo mới một account (có thể upload avatar)
 *     tags: [Accounts]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: string
 *                 description: ID người dùng
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: Ảnh đại diện (file)
 *               description:
 *                 type: string
 *               country:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               rating:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo account thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post('/', upload.single('avatar'), accountController.createAccount);

/**
 * @swagger
 * /api/accounts:
 *   get:
 *     summary: Lấy danh sách tất cả các account
 *     tags: [Accounts]
 *     responses:
 *       200:
 *         description: Danh sách account
 */
router.get('/', accountController.getAllAccounts);

/**
 * @swagger
 * /api/accounts/{id}:
 *   get:
 *     summary: Lấy thông tin một account theo ID
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin account
 *       404:
 *         description: Không tìm thấy account
 */
router.get('/:id', accountController.getAccountById);

/**
 * @swagger
 * /api/accounts/{id}:
 *   put:
 *     summary: Cập nhật một account (có thể upload avatar mới)
 *     tags: [Accounts]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *               description:
 *                 type: string
 *               country:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               rating:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy account
 */
router.put('/:id', upload.single('avatar'), accountController.updateAccount);

/**
 * @swagger
 * /api/accounts/{id}:
 *   delete:
 *     summary: Xóa một account
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy account
 */
router.delete('/:id', accountController.deleteAccount);

module.exports = router;
