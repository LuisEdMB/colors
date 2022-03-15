import { Request, Response } from 'express'
import { inject } from 'inversify'
import { controller, httpDelete, httpGet, httpPatch, httpPost } from'inversify-express-utils'

import jwtMiddleware from '../middlewares/jwt.middleware'
import rolMiddleware from '../middlewares/rol.middleware'

import BaseController from './base.controller'

import { APPLICATION_REGISTER_TYPES } from '../../application/application.register.types'

import { ColorDto } from '../../application/dtos/color.dto'

import ColorService from '../../application/services/color.service'

/**
 * @swagger
 * components:
 *   schemas:
 *     ColorDto:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Color's ID
 *         name:
 *           type: string
 *           description: Color's name
 *         color:
 *           type: string
 *           description: Color's hexadecimal color
 *         pantone:
 *           type: string
 *           description: Color's pantone
 *         year:
 *           type: number
 *           description: Color's year
 *     ColorPaginationDto:
 *       type: object
 *       properties:
 *         totalItems:
 *           type: number
 *           description: Total items for colors list
 *         itemsPerPage:
 *           type: number
 *           description: Items per page for colors list
 *         numberPages:
 *           type: number
 *           description: Number pages for colors list
 *         currentPage:
 *           type: number
 *           description: Current page for colors list
 *         colors:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schemas/ColorDto'
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

@controller('/api/colores')
class ColorControler extends BaseController {
    constructor(
        @inject(APPLICATION_REGISTER_TYPES.services.colorService) private readonly _colorService: ColorService
    ) {
        super()
    }

    /**
     * 
     * @swagger
     * /api/colores:
     *   get:
     *     summary: Get all colors or using query parameters (?limit | ?offset)
     *     tags: [ColorControler]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: query
     *         name: limit
     *         schema:
     *           type: integer
     *         description: Limit for list of colors
     *       - in: query
     *         name: offset
     *         schema:
     *           type: integer
     *         description: Offset for list of colors
     *     responses:
     *       200:
     *         description: List of colors
     *       400:
     *         description: Some validation was threw
     *       401:
     *         description: Token not valid / Rol not allowed
     *       500:
     *         description: An error has occurred during the process
     */
    @httpGet('/', jwtMiddleware({ optional: true }), rolMiddleware(['ADMIN', 'USER'], { optional: true }))
    getColors(request: Request, response: Response) {
        const limit = <string>request.query.limit ?? '6'
        const offset = <string>request.query.offset ?? '0'
        return this.execute(() => this._colorService.getColors(+limit, +offset), response)
    }

    /**
     * 
     * @swagger
     * /api/colores/{id}:
     *   get:
     *     summary: Get a color by id
     *     tags: [ColorControler]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Color's ID
     *     responses:
     *       200:
     *         description: Color found
     *       400:
     *         description: Some validation was threw
     *       401:
     *         description: Token not valid / Rol not allowed
     *       500:
     *         description: An error has occurred during the process
     */
    @httpGet('/:id', jwtMiddleware(), rolMiddleware(['ADMIN', 'USER']))
    getColor(request: Request, response: Response) {
        const id = request.params.id
        return this.execute(() => this._colorService.getColor(id), response)
    }

    /**
     * 
     * @swagger
     * /api/colores:
     *   post:
     *     summary: Create a new color
     *     tags: [ColorControler]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             $ref: '#/components/schemas/ColorDto'
     *     responses:
     *       200:
     *         description: Color created
     *       400:
     *         description: Some validation was threw
     *       401:
     *         description: Token not valid / Rol not allowed
     *       500:
     *         description: An error has occurred during the process
     */
    @httpPost('/', jwtMiddleware(), rolMiddleware(['ADMIN']))
    createColor(request: Request, response: Response) {
        const color = request.body as ColorDto
        return this.execute(() => this._colorService.createColor(color), response)
    }

    /**
     * 
     * @swagger
     * /api/colores/{id}:
     *   patch:
     *     summary: Update an existing color
     *     tags: [ColorControler]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Color's ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             $ref: '#/components/schemas/ColorDto'
     *     responses:
     *       200:
     *         description: Color updated
     *       400:
     *         description: Some validation was threw
     *       401:
     *         description: Token not valid / Rol not allowed
     *       500:
     *         description: An error has occurred during the process
     */
    @httpPatch('/:id', jwtMiddleware(), rolMiddleware(['ADMIN']))
    updateColor(request: Request, response: Response) {
        const id = request.params.id
        const color = request.body as ColorDto
        return this.execute(() => this._colorService.updateColor(id, color), response)
    }

    /**
     * 
     * @swagger
     * /api/colores/{id}:
     *   delete:
     *     summary: Delete an existing color
     *     tags: [ColorControler]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Color's ID
     *     responses:
     *       200:
     *         description: Color deleted
     *       400:
     *         description: Some validation was threw
     *       401:
     *         description: Token not valid / Rol not allowed
     *       500:
     *         description: An error has occurred during the process
     */
    @httpDelete('/:id', jwtMiddleware(), rolMiddleware(['ADMIN']))
    deleteColor(request: Request, response: Response) {
        const id = request.params.id
        return this.execute(() => this._colorService.deleteColor(id), response)
    }
}

export default ColorControler