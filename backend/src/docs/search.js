/**
 * @swagger
 *  components:
 *    schemas:
 *      Search:
 *        type: object
 *        properties:      
 *          key:
 *            type: string
 *      SearchResponse:
 *        type: object
 *        properties:
 *          results:
 *            type: object
 *
 */
/**
 * @swagger
 * tags:
 *  name: Search
 *  description: API for posting public Search.
 */

/**
 * @swagger
 * /api/v1/search/{key}:
 *    get:
 *      summary: To get all Search.
 *      tags: [Search]
 *      parameters:
 *       - name: key
 *         in: path
 *         description: The search String
 *         schema:
 *           type: string
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
 *                  $ref: '#components/schemas/SearchResponse'
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
