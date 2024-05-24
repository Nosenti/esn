/**
 * @swagger
 *  components:
 *    schemas:
 *      ShareStatus:
 *        type: object
 *        properties:
 *          status:
 *            type: string
 *          explanation:
 *            type: string
 *          color:
 *            type: string
 *      ShareStatusResponse:
 *        type: object
 *        properties:
 *          _id:
 *            type: string
 *          status:
 *            type: string
 *          explanation:
 *            type: string
 *          color:
 *            type: string
 *
 */

/**
 * @swagger
 * tags:
 *  name: Statuses
 *  description: API for share status.
 */
/**
 * @swagger
 * /api/v1/statuses:
 *    post:
 *      summary: ShareStatus. The citizen can share a status.
 *      tags: [Statuses]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: Auth token (Required for hosting on Render)
 *         schema:
 *           type: string
 *      requestBody:
 *         content:
 *             application/json:
 *                schema:
 *                   $ref: '#/components/schemas/ShareStatus'
 *      responses:
 *         200:
 *           description: Ok
 *           content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#components/schemas/ShareStatusResponse'
 *         400:
 *           description: Bad Request
 *           content:
 *            application/json:
 *              schema:
 *                type: object
 *         401:
 *           description: Unauthorized
 *           content:
 *            application/json:
 *              schema:
 *                type: object
 *         404:
 *           description: Not Found
 *           content:
 *            application/json:
 *              schema:
 *                type: object
 *         500:
 *           description: Internal Server Error
 *           content:
 *            application/json:
 *              schema:
 *                type: object
 *    get:
 *      summary: Get all statuses. 
 *      tags: [Statuses]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: Auth token (Required for hosting on Render)
 *         schema:
 *           type: string
 *      responses:
 *         200:
 *           description: A list of messages
 *           content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#components/schemas/ShareStatusResponse'
 *         400:
 *           description: Bad Request
 *           content:
 *            application/json:
 *              schema:
 *                type: object
 *         401:
 *           description: Unauthorized
 *           content:
 *            application/json:
 *              schema:
 *                type: object
 *         404:
 *           description: Not Found
 *           content:
 *            application/json:
 *              schema:
 *                type: object
 *         500:
 *           description: Internal Server Error
 *           content:
 *            application/json:
 *              schema:
 *                type: object
 * 
 */
