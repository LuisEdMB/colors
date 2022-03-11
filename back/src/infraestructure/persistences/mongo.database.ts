import { inject, injectable } from 'inversify'
import mongoose from 'mongoose'

import { CONFIG_REGISTER_TYPES } from '../../config/config.register.types'

import Config from '../../config/config'

import { INFRAESTRUCTURE_REGISTER_TYPES } from '../infraestructure.register.types'

import UserMigration from '../migrations/user.migration'

@injectable()
class MongoDatabase {
    private _connectionString: string

    constructor(
        @inject(CONFIG_REGISTER_TYPES.config) private readonly _config: Config,
        @inject(INFRAESTRUCTURE_REGISTER_TYPES.migrations.userMigration) private readonly _userMigration: UserMigration
    ) {
        this._connectionString = `mongodb://${this._config.DATABASE_SERVER}:${this._config.DATABASE_PORT}/${this._config.DATABASE_RESOURCE}`

        mongoose.connection.on('connected', () => {
            console.log('Database connected ...')
        })
        
        mongoose.connection.on('error', () => {
            console.log('Database error ...')
        })
        
        mongoose.connection.on('disconnected', () => {
            console.log('Database disconnected ...')
        })
    }

    async connect() {
        await mongoose.connect(this._connectionString)
        await this._userMigration.up()
    }
}

export default MongoDatabase