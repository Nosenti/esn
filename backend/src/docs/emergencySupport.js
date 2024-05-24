/**
 * @swagger
 * components:
 *   schemas:
 *     EmergencySP:
 *       type: object
 *       properties:
 *         institutionName:
 *           type: string
 *         serviceType:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         emailAddress:
 *           type: string
 *         location:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *               enum:
 *                 - Point
 *             required: true
 */

/**
 * @swagger
 * tags:
 *   - name: ServiceProviders
 *     description: API for Reporting Emergency Situations
 *   - name: Emergency
 *     description: API for Reporting Emergency Situations
 */

/**
 * @swagger
 * /api/v1/emergency/serviceProvider:
 *   post:
 *     summary: To capture Emergency Situations
 *     tags:
 *       - ServiceProviders
 *     parameters:
 *       - name: token
 *         in: header
 *         description: Auth token (Required for hosting on Render)
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/EmergencySP"
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmergencySP'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *   get:
 *     summary: To Report an Emergency Situation
 *     tags:
 *       - Emergency
 *     parameters:
 *       - name: token
 *         in: header
 *         description: Auth token (Required for hosting on Render)
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EmergencySP'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
