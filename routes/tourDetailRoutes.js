// routes/tourDetailRoutes.js
const express = require('express');
const {
  getAllTourDetails,
  getTourDetailByTourId,
  createTourDetail,
  updateTourDetail,
  deleteTourDetail,
} = require ('../controllers/tourDetailController.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: TourDetail
 *   description: Quản lý chi tiết tour du lịch
 */

/**
 * @swagger
 * /api/tour-details:
 *   get:
 *     summary: Lấy tất cả chi tiết tour
 *     tags: [TourDetail]
 *     responses:
 *       200:
 *         description: Danh sách chi tiết tour
 */
router.get('/', getAllTourDetails);

/**
 * @swagger
 * /api/tour-details/{tourId}:
 *   get:
 *     summary: Lấy chi tiết tour theo ID tour
 *     tags: [TourDetail]
 *     parameters:
 *       - in: path
 *         name: tourId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của tour
 *     responses:
 *       200:
 *         description: Chi tiết tour
 *       404:
 *         description: Không tìm thấy tour
 */
router.get('/:tourId', getTourDetailByTourId);

/**
 * @swagger
 * /api/tour-details:
 *   post:
 *     summary: Tạo mới chi tiết tour
 *     tags: [TourDetail]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tour:
 *                 type: string
 *                 description: ID của tour
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: URL Anh chi tiet tour
 *               highlights:
 *                 type: array
 *                 items:
 *                   type: string
 *               itinerary:
 *                 type: array
 *                 items:
 *                   type: string
 *               schedules:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     startDate:
 *                       type: string
 *                       format: date
 *                     endDate:
 *                       type: string
 *                       format: date
 *                     status:
 *                       type: string
 *               notes:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Tạo thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post('/', createTourDetail);

/**
 * @swagger
 * /api/tour-details/{id}:
 *   put:
 *     summary: Cập nhật chi tiết tour
 *     tags: [TourDetail]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID chi tiết tour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               highlights: ["Trải nghiệm mới"]
 *               itinerary: ["Ngày 1: ..."]
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy
 */
router.put('/:id', updateTourDetail);

/**
 * @swagger
 * /api/tour-details/{id}:
 *   delete:
 *     summary: Xoá chi tiết tour
 *     tags: [TourDetail]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID chi tiết tour
 *     responses:
 *       200:
 *         description: Xoá thành công
 *       404:
 *         description: Không tìm thấy
 */
router.delete('/:id', deleteTourDetail);

module.exports = router;
