import { Request, Response } from 'express'
import { inject } from 'inversify'
import { controller, httpPost } from 'inversify-express-utils'

import BaseController from './base.controller'

import { APPLICATION_REGISTER_TYPES } from '../../application/application.register.types'

import { AuthDto } from '../../application/dtos/auth.dto'

import AuthService from '../../application/services/auth.service'

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthDto:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Username for user
 *         password:
 *           type: string
 *           description: Password for user
 */

@controller('/api/auth')
class AuthController extends BaseController {
    constructor(
        @inject(APPLICATION_REGISTER_TYPES.services.authService) private readonly _authService: AuthService
    ) {
        super()
    }

    /**
     * 
     * @swagger
     * /api/auth/signin:
     *   post:
     *     summary: User authentication for generate token
     *     tags: [AuthController]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             $ref: '#/components/schemas/AuthDto'
     *     responses:
     *       200:
     *         description: Token generated
     *       400:
     *         description: Some validation was threw
     *       500:
     *         description: An error has occurred during the process
     */
    @httpPost('/signin')
    signIn(request: Request, response: Response) {
        const auth = request.body as AuthDto
        return this.execute(() => this._authService.signIn(auth), response)
    }
}

export default AuthController