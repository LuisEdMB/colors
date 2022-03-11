import BaseException from '../../domain/exceptions/base.exception'

class ModelNotFoundException extends BaseException {
    constructor(message: string) {
        super(message)
        this.code = '03'
    }
}

export default ModelNotFoundException