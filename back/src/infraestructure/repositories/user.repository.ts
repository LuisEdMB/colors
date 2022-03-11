import { injectable } from 'inversify'

import { User } from '../../domain/models/user.model'

import ModelNotFoundException from '../exceptions/model-not-found.exception'

import UserSchema from '../persistences/schemas/user.schema'

@injectable()
class UserRepository {
    async getByUsername(username: string): Promise<User> {
        const model = await UserSchema.findOne({ username })
        if (!model) throw new ModelNotFoundException('User not exists.')
        return model
    }

    async createUser(user: User): Promise<void> {
        const model = new UserSchema(user)
        await model.save()
    }
}

export default UserRepository