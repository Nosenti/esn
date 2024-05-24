/**
 * @swagger
 *  components:
 *    schemas:
 *      support-availability:
 *        type: object
 *        properties:      
 *          startDate:
 *            type: string
 *          endDate:
 *            type: string
 *          phone:
 *            type: string
 *          email:
 *            type: string
 *      support-availabilityResponse:
 *        type: object
 *        properties:
 *          startDate:
 *            type: string
 *          endDate:
 *            type: string
 *          phone:
 *            type: string
 *          email:
 *            type: string
 *          _id:
 *            type: string
 *
 */
/**
 * @swagger
 * tags:
 *  name: support-availability (Support Availability)
 *  description: API for posting public support-availability (Support Availability).
 */

/**
 * @swagger
 * /api/v1/support-availability/{id}:
 *    post:
 *      summary: To post an schedule.
 *      tags: [support-availability (Support Availability)]
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
 *                   $ref: "#/components/schemas/support-availability"
 *      responses:
 *         200:
 *           description: Ok
 *           content:
 *            application/json:
 *              schema:
 *               $ref: '#components/schemas/support-availabilityResponse'
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
 *      summary: To get all support-availability (Support Availability).
 *      tags: [support-availability (Support Availability)]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: Auth token (Required for hosting on Render)
 *         schema:
 *           type: string
 *      responses:
 *         200:
 *           description: Ok
 *           content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#components/schemas/support-availabilityResponse'
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
 *    put:
 *      summary: To update the support availability.
 *      tags: [support-availability (Support Availability)]
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
 *                   $ref: "#/components/schemas/support-availability"
 *      responses:
 *         200:
 *           description: Ok
 *           content:
 *            application/json:
 *              schema:
 *               $ref: '#components/schemas/support-availabilityResponse'
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
 *    delete:
 *      summary: To delete Support Availability.
 *      tags: [support-availability (Support Availability)]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: Auth token (Required for hosting on Render)
 *         schema:
 *           type: string
 *       - name: id
 *         in: query
 *         description: ID of the support availability to be deleted
 *         schema:
 *           type: string
 *      responses:
 *         200:
 *           description: Ok
 *           content:
 *            application/json:
 *              type: object
 *              properties:
 *               message:
 *                type: string
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
