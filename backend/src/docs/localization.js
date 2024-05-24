/**
 * @swagger
 * tags:
 *   name: Language
 *   description: API for managing language preferences.
 */

/**
 * @swagger
 * /api/v1/citizens/{citizenId}/language:
 *    put:
 *      summary: Update User Language Preference
 *      tags: [Language]
 *      parameters:
 *        - in: path
 *          name: citizenId
 *          schema:
 *            type: string
 *          required: true
 *          description: The ID of the citizen
 *        - in: query
 *          name: language
 *          schema:
 *            type: string
 *          required: true
 *          description: The preferred language code (e.g., 'en', 'fr')
 *      responses:
 *        200:
 *          description: Language preference updated successfully
 *        400:
 *          description: Invalid language code or citizen ID
 *        401:
 *          description: Unauthorized access
 *        500:
 *          description: Internal server error
 *      security:
 *        - apiKey: []
 */

/**
 * @swagger
 * /api/v1/citizens/{citizenId}/language:
 *    get:
 *      summary: Retrieve User Language Preference
 *      tags: [Language]
 *      parameters:
 *        - in: path
 *          name: citizenId
 *          schema:
 *            type: string
 *          required: true
 *          description: The ID of the citizen
 *      responses:
 *        200:
 *          description: Language preference retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  language:
 *                    type: string
 *                    description: The preferred language code
 *        400:
 *          description: Invalid citizen ID
 *        401:
 *          description: Unauthorized access
 *        404:
 *          description: Citizen not found
 *        500:
 *          description: Internal server error
 *      security:
 *        - apiKey: []
 */
