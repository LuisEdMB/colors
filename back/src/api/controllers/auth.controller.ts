import { Request, Response } from 'express'
import { inject } from 'inversify'
import { controller, httpPost } from 'inversify-express-utils'

import BaseController from './base.controller'

import { APPLICATION_REGISTER_TYPES } from '../../application/application.register.types'

import { AuthDto } from '../../application/dtos/auth.dto'

import AuthService from '../../application/services/auth.service'

@controller('/api/auth')
class AuthController extends BaseController {
    constructor(
        @inject(APPLICATION_REGISTER_TYPES.services.authService) private readonly _authService: AuthService
    ) {
        super()
    }

    @httpPost('/signin')
    signIn(request: Request, response: Response) {
        const auth = request.body as AuthDto
        return this.execute(() => this._authService.signIn(auth), response)
    }
}

export default AuthController