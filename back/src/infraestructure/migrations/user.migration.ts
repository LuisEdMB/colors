import { inject, injectable } from 'inversify'
import * as bcrypt from 'bcrypt'

import { User } from '../../domain/models/user.model'

import { INFRAESTRUCTURE_REGISTER_TYPES } from '../infraestructure.register.types'

import UserSchema from '../persistences/schemas/user.schema'

import UserRepository from '../repositories/user.repository'

@injectable()
class UserMigration {
    constructor(
        @inject(INFRAESTRUCTURE_REGISTER_TYPES.repositories.userRepository) private readonly _userRepository: UserRepository
    ) { }

    async up() {
        try {
            const salt = await bcrypt.genSalt();
            const password = '123456'
            const adminUsername = 'admin'
            const userUsername = 'user'
            const adminUser = await UserSchema.findOne({ adminUsername })
            const userUser = await UserSchema.findOne({ userUsername })
            if (!adminUser) {
                const userAdmin: User = {
                    username: 'admin',
                    password: await bcrypt.hash(password, salt),
                    rol: 'ADMIN'
                }
                await this._userRepository.createUser(userAdmin)
            }
            if (!userUser) {
                const user: User = {
                    username: 'user',
                    password: await bcrypt.hash(password, salt),
                    rol: 'USER'
                }
                await this._userRepository.createUser(user)
            }
            console.log(`User created: ${adminUsername}, with password: ${password}`)
            console.log(`User created: ${userUsername}, with password: ${password}`)
        } catch(exception) {
            console.log((exception as Error)?.message ?? 'Migrations error...')
        }
    }
}

export default UserMigration