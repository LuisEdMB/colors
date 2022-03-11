import { injectable } from 'inversify'

import { Color } from '../../domain/models/color.model'

import ModelNotFoundException from '../exceptions/model-not-found.exception'

import ColorSchema from '../persistences/schemas/color.schema'

@injectable()
class ColorRepository {
    async get(filter?: Object): Promise<Color[]> {
        return await ColorSchema.find(filter ?? { })
    }

    async getById(id: string): Promise<Color> {
        const model = await ColorSchema.findOne({ _id: id })
        if (!model) throw new ModelNotFoundException('ToDo not exists.')
        return model
    }

    async create(color: Color): Promise<Color> {
        const model = new ColorSchema(color)
        const newModel = await model.save()
        return newModel
    }

    async update(color: Color): Promise<Color> {
        await ColorSchema.updateOne({ _id: color._id }, { $set: color })
        return color
    }

    async delete(id: string): Promise<Color> {
        const model = await ColorSchema.findOne({ _id: id })
        if (!model) throw new ModelNotFoundException('ToDo not exists.')
        model.delete()
        return model
    }
}

export default ColorRepository