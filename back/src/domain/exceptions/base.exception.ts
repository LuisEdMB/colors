class BaseException extends Error {
    code: string

    constructor(message: string) {
        super(message)
        this.code = '01'
    }
}

export default BaseException