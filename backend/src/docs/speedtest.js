/**
 * @swagger
 *  components:
 *    schemas:
 *      SpeedTest:
 *        type: object
 *        properties:      
 *          interval:
 *            type: integer
 *          duration:
 *            type: integer
 *      SpeedTestResponse:
 *        type: object
 *        properties:
 *          message:
 *            type: string
 *          postRequestsPerSecond:
 *            type: integer
 *          GetRequestsPerSecond:
 *            type: integer
 *
 */
/**
 * @swagger
 * tags:
 *  name: Tests
 *  description: API for different testings.
 */

/**
 * @swagger
 * /api/v1/speed-test:
 *    post:
 *      summary: To test the performance of the system.
 *      tags: [Tests]
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
 *                   $ref: "#/components/schemas/SpeedTest"
 *      responses:
 *         200:
 *           description: Ok
 *           content:
 *            application/json:
 *              schema:
 *                $ref: '#components/schemas/SpeedTestResponse'
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
 *      summary: To test the performance of the system.
 *      tags: [Tests]
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
 *                  $ref: '#components/schemas/SpeedTestResponse'
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
