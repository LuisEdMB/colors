import { injectable } from 'inversify'
import dotenv from 'dotenv'

dotenv.config()

@injectable()
class Config {
    public PORT_API: number
    public JWT_SECRET: string
    public DATABASE_SERVER: string
    public DATABASE_PORT: number
    public DATABASE_RESOURCE: string

    constructor() {
        this.PORT_API = +(process.env.PORT_API ?? '')
        this.JWT_SECRET = process.env.JWT_SECRET ?? ''
        this.DATABASE_SERVER = process.env.DATABASE_SERVER ?? ''
        this.DATABASE_PORT = +(process.env.DATABASE_PORT ?? '')
        this.DATABASE_RESOURCE = process.env.DATABASE_RESOURCE ?? ''
    }
}

export default Config