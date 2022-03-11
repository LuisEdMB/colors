import { NextFunction, Request, Response } from 'express'

const rolMiddleware = (roles: string[], options?: Options) => {
    return async (_: Request, response: Response, next: NextFunction) => {
        const { rol } = response.locals.jwtPayload ?? { }
        const rolExist = roles.find((r) => r === rol)
        if (options?.optional || rolExist) next()
        else response.status(401).send({
            message: 'Rol is not allowed.'
        })
    }
}

interface Options {
    optional?: boolean
}

export default rolMiddleware