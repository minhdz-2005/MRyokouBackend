const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

/**
 * @swagger
 * tags:
 *   name: Ratings
 *   description: Quản lý đánh giá tour
 */

/**
 * @swagger
 * /api/ratings:
 *   post:
 *     summary: Tạo mới một đánh giá
 *     tags: [Ratings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               booking:
 *                 type: string
 *                 description: ID booking (Booking)
 *               user:
 *                 type: string
 *                 description: ID người dùng (Account)
 *               star:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 5
 *               tourRate:
 *                 type: string
 *               serviceRate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo đánh giá thành công
 */
router.post('/', ratingController.createRating);

/**
 * @swagger
 * /api/ratings:
 *   get:
 *     summary: Lấy danh sách tất cả các đánh giá
 *     tags: [Ratings]
 *     responses:
 *       200:
 *         description: Trả về danh sách đánh giá
 */
router.get('/', ratingController.getAllRatings);

/**
 * @swagger
 * /api/ratings/{id}:
 *   get:
 *     summary: Lấy đánh giá theo ID
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID đánh giá
 *     responses:
 *       200:
 *         description: Trả về thông tin đánh giá
 *       404:
 *         description: Không tìm thấy
 */
router.get('/:id', ratingController.getRatingById);

/**
 * @swagger
 * /api/ratings/user/{userId}:
 *   get:
 *     summary: Lấy danh sách đánh giá theo userId
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của người dùng (Account)
 *     responses:
 *       200:
 *         description: Trả về danh sách đánh giá của người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   booking:
 *                     $ref: '#/components/schemas/Booking'
 *                   user:
 *                     $ref: '#/components/schemas/Account'
 *                   star:
 *                     type: number
 *                   tourRate:
 *                     type: string
 *                   serviceRate:
 *                     type: string
 *       404:
 *         description: Không tìm thấy đánh giá cho userId này
 *       500:
 *         description: Lỗi server
 */
// Route: Lấy rating theo user ID
router.get('/user/:userId', ratingController.getRatingsByUserId);

/**
 * @swagger
 * /api/ratings/booking/{bookingId}:
 *   get:
 *     summary: Lấy đánh giá theo bookingId
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của booking
 *     responses:
 *       200:
 *         description: Trả về danh gia theo booking id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 booking:
 *                   $ref: '#/components/schemas/Booking'
 *                 user:
 *                   $ref: '#/components/schemas/Account'
 *                 star:
 *                   type: number
 *                 tourRate:
 *                   type: string
 *                 serviceRate:
 *                   type: string
 *       404:
 *         description: Không tìm thấy đánh giá cho bookingId này
 *       500:
 *         description: Lỗi server
 */
// Route: Lấy rating theo user ID
router.get('/booking/:bookingId', ratingController.getRatingsByBookingId);

/**
 * @swagger
 * /api/ratings/{id}:
 *   put:
 *     summary: Cập nhật đánh giá
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID đánh giá
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               star:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 5
 *               tourRate:
 *                 type: string
 *               serviceRate:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy
 */
router.put('/:id', ratingController.updateRating);

/**
 * @swagger
 * /api/ratings/{id}:
 *   delete:
 *     summary: Xóa đánh giá
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID đánh giá
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy
 */
router.delete('/:id', ratingController.deleteRating);

module.exports = router;
