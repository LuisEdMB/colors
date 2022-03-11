import { Schema, model } from 'mongoose'

import { User } from '../../../domain/models/user.model'

const schema = new Schema<User>({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true
    }
})

const entity = model<User>('user', schema)

export default entity