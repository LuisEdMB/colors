import { Container } from 'inversify'

import { INFRAESTRUCTURE_REGISTER_TYPES } from './infraestructure.register.types'

import UserRepository from './repositories/user.repository'
import ColorRepository from './repositories/color.repository'

import MongoDatabase from './persistences/mongo.database'

import UserMigration from './migrations/user.migration'

const container = new Container()

container.bind<UserRepository>(INFRAESTRUCTURE_REGISTER_TYPES.repositories.userRepository).to(UserRepository)
container.bind<ColorRepository>(INFRAESTRUCTURE_REGISTER_TYPES.repositories.colorRepository).to(ColorRepository)

container.bind<MongoDatabase>(INFRAESTRUCTURE_REGISTER_TYPES.databases.mongoDatabase).to(MongoDatabase)

container.bind<UserMigration>(INFRAESTRUCTURE_REGISTER_TYPES.migrations.userMigration).to(UserMigration)

export default container