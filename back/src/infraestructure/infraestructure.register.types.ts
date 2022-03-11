export const INFRAESTRUCTURE_REGISTER_TYPES = {
    databases: {
        mongoDatabase: Symbol.for('MongoDatabase')
    },
    repositories: {
        userRepository: Symbol.for('UserRepository'),
        colorRepository: Symbol.for('ColorRepository')
    },
    migrations: {
        userMigration: Symbol.for('UserMigration')
    }
}