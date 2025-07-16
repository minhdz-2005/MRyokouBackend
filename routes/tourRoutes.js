const express = require('express');
const router = express.Router();
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
} = require('../controllers/tourController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Tour:
 *       type: object
 *       required:
 *         - title
 *         - location
 *         - description
 *         - price
 *         - duration
 *         - image
 *       properties:
 *         _id:
 *           type: string
 *           description: MongoDB ObjectId
 *         title:
 *           type: string
 *           example: Tour Nha Trang biển xanh
 *         location:
 *           type: string
 *           example: Nha Trang
 *         description:
 *           type: string
 *           example: Khám phá biển xanh cát trắng nước trong...
 *         price:
 *           type: number
 *           example: 4800000
 *         duration:
 *           type: string
 *           example: 3 ngày 2 đêm
 *         image:
 *           type: string
 *           example: https://source.unsplash.com/400x300/?nhatrang,beach
 *         rating:
 *           type: number
 *           example: 4.5
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           example: ["beach","summer"]
 *       example:
 *         title: Tour Nha Trang biển xanh
 *         location: Nha Trang
 *         description: Khám phá biển xanh cát trắng nước trong...
 *         price: 4800000
 *         duration: 3 ngày 2 đêm
 *         image: https://source.unsplash.com/400x300/?nhatrang,beach
 *         rating: 4.5
 *         tags: ["beach","summer"]
 */

/**
 * @swagger
 * tags:
 *   name: Tours
 *   description: API quản lý tour du lịch
 */

/**
 * @swagger
 * /api/tours:
 *   get:
 *     summary: Lấy danh sách tour (có phân trang)
 *     tags: [Tours]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Trang muốn lấy (mặc định 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Số bản ghi mỗi trang (mặc định 8)
 *     responses:
 *       200:
 *         description: Danh sách tour
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 total:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Tour'
 *
 *   post:
 *     summary: Tạo tour mới
 *     tags: [Tours]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tour'
 *     responses:
 *       201:
 *         description: Tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tour'
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.route('/')
  .get(getAllTours)
  .post(createTour);

/**
 * @swagger
 * /api/tours/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết 1 tour
 *     tags: [Tours]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của tour
 *     responses:
 *       200:
 *         description: Chi tiết tour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tour'
 *       404:
 *         description: Không tìm thấy tour
 *
 *   put:
 *     summary: Cập nhật tour
 *     tags: [Tours]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tour'
 *     responses:
 *       200:
 *         description: Đã cập nhật
 *       400:
 *         description: Cập nhật thất bại
 *       404:
 *         description: Không tìm thấy tour
 *
 *   delete:
 *     summary: Xoá tour
 *     tags: [Tours]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Đã xoá tour
 *       404:
 *         description: Không tìm thấy tour
 */
router.route('/:id')
  .get(getTour)
  .put(updateTour)
  .delete(deleteTour);

module.exports = router;
