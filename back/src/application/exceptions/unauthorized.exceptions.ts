import BaseException from "../../domain/exceptions/base.exception"

class UnauthorizedException extends BaseException {
    constructor(message: string) {
        super(message)
        this.code = '04'
    }
}

export default UnauthorizedException