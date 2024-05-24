/**
 * @swagger
 *  components:
 *    schemas:
 *      ApiChat:
 *        type: object
 *        properties:
 *          message:
 *            type: string
 *          createdAt:
 *            type: string
 *      ApiChatResponse:
 *        type: object
 *        properties:
 *          _id:
 *            type: string
 *          username:
 *            type: string
 *          message:
 *            type: string
 *          timestamps:
 *            type: string
 *      ApiChatPrivate:
 *        type: object
 *        properties:
 *          message:
 *            type: string
 *          createdAt:
 *            type: string
 *      ApiChatPrivateResponse:
 *        type: object
 *        properties:
 *          _id:
 *            type: string
 *          username:
 *            type: string
 *          message:
 *            type: string
 *          createdAt:
 *            type: string
 *
 */

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: API for managing chat messages.
 */

/**
 * @swagger
 * /api/v1/messages:
 *    post:
 *      summary: Chat publicly. The citizen can send a chat to the community.
 *      tags: [Messages]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: Auth token
 *         schema:
 *           type: string
 *      requestBody:
 *         content:
 *             application/json:
 *                schema:
 *                   $ref: "#/components/schemas/ApiChat"
 *      responses:
 *         200:
 *           description: Ok
 *           content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#components/schemas/ApiChatResponse'
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
 *      summary: Get all messages. Once a citizen choose to chat publicly, the previous messages should be seen.
 *      tags: [Messages]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: Auth token
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
 *                  $ref: '#components/schemas/ApiChatResponse'
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
 * /api/v1/message:
 *    post:
 *      summary: Chat Privately. The citizen can send a private chat to another citizen.
 *      tags: [Messages]
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
 *                   $ref: "#/components/schemas/ApiChatPrivate"
 *      responses:
 *         200:
 *           description: Ok
 *           content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#components/schemas/ApiChatPrivateResponse'
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
 *      summary: Get a message.
 *      tags: [Messages]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: Auth token (Required for hosting on Render)
 *         schema:
 *           type: string
 *       - name: id
 *         in: path
 *         description: This is the ID of the user
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
 *                  $ref: '#components/schemas/ApiChatPrivateResponse'
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
