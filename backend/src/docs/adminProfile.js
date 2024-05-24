/**
 * @swagger
 *  components:
 *    schemas:
 
 *      ApiResponseGetCitizens:
 *        type: object
 *        properties:
 *          username:
 *            type: string
 *          isActive:
 *            type: boolean
 *      AdminProfile:
 *        type: object
 *        properties:
 *          username:
 *            type: string
 *          isActive:
 *            type: boolean
 *      ChangePassword:
 *        type: object
 *        properties:
 *          password:
 *            type: string
 *      AdminProfileResponse:
 *        type: object
 *        properties:
 *          _id:
 *            type: string
 *          username:
 *            type: string
 *          isActive:
 *            type: boolean
 *
 */

/**
 * @swagger
 * tags:
 *  name: AdministerProfile
 *  description: API for administering profile.
 */
/**
 * @swagger
 * /api/v1/citizens/{id}/active:
 *    patch:
 *      summary: AdminProfile. The admin can activate the user.
 *      tags: [AdministerProfile]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: Auth token (Required for hosting on Render)
 *         schema:
 *           type: string
 *       - name: id
 *         in: param
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
 *                  $ref: '#components/schemas/AdminProfileResponse'
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
 * /api/v1/citizens/{id}/inactive:
 *    patch:
 *      summary: AdminProfile. The Admin can deactivate users.
 *      tags: [AdministerProfile]
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
 *                   $ref: '#/components/schemas/AdminProfile'
 *      responses:
 *         200:
 *           description: Ok
 *           content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#components/schemas/AdminProfileResponse'
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
 * /api/v1/citizens/inactive:
 *    get:
 *      summary: AdminProfile. The Admin can retrive inactive users.
 *      tags: [AdministerProfile]
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
 *                   $ref: '#/components/schemas/ApiResponseGetCitizens'
 *      responses:
 *         200:
 *           description: Ok
 *           content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#components/schemas/AdminProfileResponse'
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
 * /api/v1/citizens/:id:
 *    patch:
 *      summary: AdminProfile. The Admin and logged in users can change the user's data.
 *      tags: [AdministerProfile]
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
 *                   $ref: '#/components/schemas/ApiResponseGetCitizens'
 *      responses:
 *         200:
 *           description: Ok
 *           content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#components/schemas/AdminProfileResponse'
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
 * /api/v1/citizens/:id/password:
 *    patch:
 *      summary: AdminProfile. The Admin and logged in users can change the user's password.
 *      tags: [AdministerProfile]
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
 *                   $ref: '#/components/schemas/ChangePassword'
 *      responses:
 *         200:
 *           description: Ok
 *           content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#components/schemas/AdminProfileResponse'
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
