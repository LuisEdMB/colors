import { Response } from 'express'
import { injectable } from 'inversify'

import BaseException from '../../domain/exceptions/base.exception'

@injectable()
class BaseController {
    async execute(action: any, response: Response) {
        try {
            const result = await action()
            return response.status(200).send({
                data: result
            })
        } catch(exception) {
            if (exception instanceof BaseException) return response.status(400).send({
                code: exception.code,
                message: exception.message
            })
            return response.status(500).send({
                error: (exception as Error)?.message ?? 'An error has ocurred.'
            })
        }
    }
}

export default BaseController