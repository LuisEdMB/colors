import { Request, Response } from 'express'
import { inject } from 'inversify'
import { controller, httpDelete, httpGet, httpPatch, httpPost } from'inversify-express-utils'

import jwtMiddleware from '../middlewares/jwt.middleware'
import rolMiddleware from '../middlewares/rol.middleware'

import BaseController from './base.controller'

import { APPLICATION_REGISTER_TYPES } from '../../application/application.register.types'

import { ColorDto } from '../../application/dtos/color.dto'

import ColorService from '../../application/services/color.service'

@controller('/api/colores')
class ColorControler extends BaseController {
    constructor(
        @inject(APPLICATION_REGISTER_TYPES.services.colorService) private readonly _colorService: ColorService
    ) {
        super()
    }

    @httpGet('/', jwtMiddleware({ optional: true }), rolMiddleware(['ADMIN', 'USER'], { optional: true }))
    getColors(request: Request, response: Response) {
        const limit = <string>request.query.limit ?? '6'
        const offset = <string>request.query.offset ?? '0'
        return this.execute(() => this._colorService.getColors(+limit, +offset), response)
    }

    @httpGet('/:id', jwtMiddleware(), rolMiddleware(['ADMIN', 'USER']))
    getColor(request: Request, response: Response) {
        const id = request.params.id
        return this.execute(() => this._colorService.getColor(id), response)
    }

    @httpPost('/', jwtMiddleware(), rolMiddleware(['ADMIN']))
    createColor(request: Request, response: Response) {
        const color = request.body as ColorDto
        return this.execute(() => this._colorService.createColor(color), response)
    }

    @httpPatch('/:id', jwtMiddleware(), rolMiddleware(['ADMIN']))
    updateColor(request: Request, response: Response) {
        const id = request.params.id
        const color = request.body as ColorDto
        return this.execute(() => this._colorService.updateColor(id, color), response)
    }

    @httpDelete('/:id', jwtMiddleware(), rolMiddleware(['ADMIN']))
    deleteColor(request: Request, response: Response) {
        const id = request.params.id
        return this.execute(() => this._colorService.deleteColor(id), response)
    }
}

export default ColorControler