import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'

import { CONFIG_REGISTER_TYPES } from '../../config/config.register.types'

import Config from '../../config/config'

import DIContainer from '../../ioc/di.container'

const jwtMiddleware = (options?: Options) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        try {
            const config = DIContainer.get<Config>(CONFIG_REGISTER_TYPES.config)
            const token = <string>request.headers['authorization']
            if (!options?.optional) {
                const payload = jwt.verify(token?.split(' ')[1], config.JWT_SECRET)
                response.locals.jwtPayload = payload
            }
            next()
        } catch(exception) {
            response.status(401).send({
                message: 'Token is not valid.'
            })
        }
    }
}

interface Options {
    optional?: boolean
}

export default jwtMiddleware