import BaseException from './base.exception'

class ValidationException extends BaseException {
    constructor(message: string) {
        super(message)
        this.code = '02'
    }
}

export default ValidationException