import { inject, injectable } from 'inversify'

import { ColorDto } from '../dtos/color.dto'
import { ColorPaginationDto } from '../dtos/color.pagination.dto'

import * as utils from '../../utils/pagination.util'

import { Color } from '../../domain/models/color.model'

import { DOMAIN_REGISTER_TYPES } from '../../domain/domain.register.types'
import { INFRAESTRUCTURE_REGISTER_TYPES } from '../../infraestructure/infraestructure.register.types'

import ColorDomainService from '../../domain/services/color.domain.service'
import ColorRepository from '../../infraestructure/repositories/color.repository'

@injectable()
class ColorService {
    constructor(
        @inject(DOMAIN_REGISTER_TYPES.services.colorDomainService) private readonly _colorDomainService: ColorDomainService,
        @inject(INFRAESTRUCTURE_REGISTER_TYPES.repositories.colorRepository) private readonly _colorRepository: ColorRepository
    ) { }

    async getColors(limit: number, offset: number): Promise<ColorPaginationDto> {
        const colors = await this._colorRepository.get()
        const pagination = utils.paginateByLimit(colors, limit, offset)
        return this.mappingToDtoPagination(pagination)
    }

    async getColor(id: string): Promise<ColorDto> {
        const color = await this._colorRepository.getById(id)
        return this.mappingToDto(color)
    }

    async createColor(colorDto: ColorDto): Promise<ColorDto> {
        const color = this._colorDomainService.createColor(colorDto.name, colorDto.color, colorDto.pantone)
        const newColor = await this._colorRepository.create(color)
        return this.mappingToDto(newColor)
    }

    async updateColor(id: string, colorDto: ColorDto): Promise<ColorDto> {
        let color = await this._colorRepository.getById(id)
        color = this._colorDomainService.updateColor(color, colorDto.name, colorDto.color, colorDto.pantone)
        const updColor = await this._colorRepository.update(color)
        return this.mappingToDto(updColor)
    }

    async deleteColor(id: string): Promise<ColorDto> {
        const color = await this._colorRepository.delete(id)
        return this.mappingToDto(color)
    }

    private mappingToDtoPagination(pagination: any): ColorPaginationDto {
        const dto: ColorPaginationDto = {
            totalItems: pagination.totalItems,
            itemsPerPage: pagination.itemsPerPage,
            numberPages: pagination.numberPages,
            currentPage: pagination.currentPage,
            colors: pagination.data.map(this.mappingToDto)
        }
        return dto
    }

    private mappingToDto(color: Color): ColorDto {
        const dto: ColorDto = {
            _id: color._id,
            name: color.name,
            color: color.color,
            pantone: color.pantone,
            year: color.year
        }
        return dto
    }
}

export default ColorService