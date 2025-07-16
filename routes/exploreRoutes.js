const express = require('express');
const router = express.Router();
const { getDestinations } = require('../controllers/exploreController');

/**
 * @swagger
 * tags:
 *   name: Explore
 *   description: Khám phá tour theo địa điểm, mùa...

 * @swagger
 * /api/explore/destinations:
 *   get:
 *     summary: Lấy danh sách địa điểm du lịch từ dữ liệu tour
 *     tags: [Explore]
 *     responses:
 *       200:
 *         description: Danh sách địa điểm thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: Đà Lạt
 *                   image:
 *                     type: string
 *                     example: https://source.unsplash.com/600x400/?dalat,vietnam
 *                   totalTours:
 *                     type: integer
 *                     example: 5
 *       500:
 *         description: Lỗi server khi lấy địa điểm
 */
router.get('/destinations', getDestinations);

module.exports = router;
