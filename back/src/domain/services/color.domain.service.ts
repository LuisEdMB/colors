import { injectable } from 'inversify'

import ValidationException from '../exceptions/validation.exception'

import { Color } from '../models/color.model'

@injectable()
class ColorDomainService {
    createColor(name: string, color: string, pantone: string): Color {
        this.validateColor(name, color, pantone)
        return { name, color, pantone, year: new Date().getFullYear() }
    }

    updateColor(colorModel: Color, name: string, color: string, pantone: string): Color {
        this.validateColor(name, color, pantone)
        colorModel.name = name
        colorModel.color = color
        colorModel.pantone = pantone
        return colorModel
    }

    private validateColor(name: string, color: string, pantone: string): void {
        if (!name) throw new ValidationException('Name must not be empty.')
        if (!color) throw new ValidationException('Color must not be empty.')
        if (!pantone) throw new ValidationException('Pantone must not be empty.')
        this.validateHexColor(color)
    }

    private validateHexColor(color: string): void {
        if (!(/^#[0-9A-F]{6}$/i).test(color)) throw new ValidationException('Color has an incorrect hexadecimal format.')
    }
}

export default ColorDomainService