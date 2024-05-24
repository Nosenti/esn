/**
 * @swagger
 *  components:
 *    schemas:
 *      ApiResponseGetCitizens:
 *        type: object
 *        properties:
 *          _id:
 *            type: string
 *          username:
 *            type: string
 *          status:
 *            type: string
 *      ApiJoinCommunity:
 *        type: object
 *        properties:
 *          username:
 *            type: string
 *          password:
 *            type: string
 *      ApiJoinCommunityResponse:
 *        type: object
 *        properties:
 *          status:
 *            type: string
 *          token:
 *            type: string
 *          user:
 *            type: object
 *            properties:
 *             _id:
 *              type: string
 *             username:
 *              type: string
 *             healthStatus:
 *              type: string
 *             healthStatusTimestamps:
 *              type: string
 *
 */

/**
 * @swagger
 * tags:
 *   name: Citizens
 *   description: API for managing citizens.
 */

/**
 * @swagger
 * /api/v1/citizens:
 *    get:
 *      summary: Get all citizens. After joining the community, citizens can see themself listed in the directory, along with other citizens.
 *      tags: [Citizens]
 *      parameters:
 *       - name: sort
 *         in: query
 *         description: Sort the results by status and username
 *         schema:
 *           type: string
 *           enum: ["-status,username"]
 *       - name: fields
 *         in: query
 *         description: Specify which fields to include in the response
 *         schema:
 *           type: string
 *           enum: ["username,status"]
 *       - name: token
 *         in: header
 *         description: Auth token (Required for hosting on Render)
 *         schema:
 *           type: string
 *      responses:
 *         200:
 *           description: A list of Citizens
 *           content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#components/schemas/ApiResponseGetCitizens'
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
 *    post:
 *      summary: Join a community
 *      tags: [Citizens]
 *      requestBody:
 *         content:
 *             application/json:
 *                schema:
 *                   $ref: "#/components/schemas/ApiJoinCommunity"
 *      responses:
 *         200:
 *           description: Ok
 *           content:
 *            application/json:
 *              schema:
 *               $ref: '#components/schemas/ApiJoinCommunityResponse'
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
