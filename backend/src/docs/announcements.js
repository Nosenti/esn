/**
 * @swagger
 *  components:
 *    schemas:
 *      Announcements:
 *        type: object
 *        properties:      
 *          title:
 *            type: string
 *          announcement:
 *            type: string
 *      AnnouncementsResponse:
 *        type: object
 *        properties:
 *          announcement:
 *            type: string
 *          newAnnouncement:
 *            type: object
 *            properties:
 *              senderId:
 *                type: string
 *              title:
 *                type: string
 *              announcement:
 *                type: string
 *              _id:
 *                type: string
 *              createdAt:
 *                type: string
 *
 */
/**
 * @swagger
 * tags:
 *  name: Announcements
 *  description: API for posting public announcements.
 */

/**
 * @swagger
 * /api/v1/announcements:
 *    post:
 *      summary: To post an announcement.
 *      tags: [Announcements]
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
 *                   $ref: "#/components/schemas/Announcements"
 *      responses:
 *         200:
 *           description: Ok
 *           content:
 *            application/json:
 *              schema:
 *               $ref: '#components/schemas/AnnouncementsResponse'
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
 *      summary: To get all announcements.
 *      tags: [Announcements]
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
 *                  $ref: '#components/schemas/AnnouncementsResponse'
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
