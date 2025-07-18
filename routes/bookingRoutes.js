const express = require('express');
const router = express.Router();
const { createBooking } = require('../controllers/bookingController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - tour
 *         - fullName
 *         - email
 *         - phone
 *         - departureDate
 *         - adults
 *       properties:
 *         _id:
 *           type: string
 *           description: MongoDB ObjectId
 *         tour:
 *           type: string
 *           description: ID của tour
 *         fullName:
 *           type: string
 *           example: Nguyễn Văn A
 *         email:
 *           type: string
 *           example: example@email.com
 *         phone:
 *           type: string
 *           example: 0901234567
 *         departureDate:
 *           type: string
 *           format: date
 *           example: 2025-08-01
 *         adults:
 *           type: number
 *           example: 2
 *         children:
 *           type: number
 *           example: 1
 *         note:
 *           type: string
 *           example: Yêu cầu thêm xe đưa đón
 *       example:
 *         tour: 64f124c1ee6cda1234567890
 *         fullName: Nguyễn Văn A
 *         email: example@email.com
 *         phone: 0901234567
 *         departureDate: 2025-08-01
 *         adults: 2
 *         children: 1
 *         note: Yêu cầu thêm xe đưa đón
 */

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: API đặt tour
 */

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Đặt tour mới
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: Đặt tour thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post('/', createBooking);

module.exports = router;