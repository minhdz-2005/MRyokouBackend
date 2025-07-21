const express = require('express');
const router = express.Router();
const {
    createExplore,
    getAllExplores,
    getByRegion,
    updateExplore,
    deleteExplore,

} = require('../controllers/exploreController');

/**
 * @swagger
 * tags:
 *   name: Explore
 *   description: Explore VietNam
 */
/**
 * @swagger
 * /api/explore:
 *   get:
 *     summary: Get All Explore
 *     tags: [Explore]
 *     response:
 *       200:
 *         description: All Explore Locations
 */
router.get('/', getAllExplores);

/**
 * @swagger
 * /api/explore/region/{region}:
 *   get:
 *     summary: Get Explore by region
 *     tags: [Explore]
 *     parameters:
 *       - in: path
 *         name: ExploreRegion
 *         required: true
 *         schema:
 *           type: string
 *         description: Explore region
 *     responses:
 *       200:
 *         description: explore
 *       404:
 *         description: not found
 */
router.get('/:region', getByRegion);

/**
 * @swagger
 * /api/explore:
 *   post:
 *     summary: Create explore
 *     tags: [Explore]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               region:
 *                 type: string
 *               fullDesc:
 *                 type: array
 *                 items:
 *                   type: string
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Create ok
 *       400:
 *         description: Failed
 */
router.post('/', createExplore);

/**
 * @swagger
 * /api/explore/{id}:
 *   put:
 *     summary: update explore
 *     tags: [Explore]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of explore
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: put OK
 *       404: 
 *         description: put falied
 */
router.put('/', updateExplore)

/**
 * @swagger
 * /api/explore/{id}:
 *   delete: 
 *     summary: delete explore
 *     tags: [Explore]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID cua explore
 *     responses:
 *       200:
 *         description: del ok
 *       404: 
 *         description: del failed
 */

router.delete('/', deleteExplore)

module.exports = router;