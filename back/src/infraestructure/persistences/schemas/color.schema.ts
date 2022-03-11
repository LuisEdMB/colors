import { Schema, model } from 'mongoose'

import { Color } from '../../../domain/models/color.model'

const schema = new Schema<Color>({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    pantone: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
})

const entity = model<Color>('color', schema)

export default entity