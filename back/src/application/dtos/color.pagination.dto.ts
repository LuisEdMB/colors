import { ColorDto } from './color.dto'

export interface ColorPaginationDto {
    totalItems: number,
    itemsPerPage: number,
    numberPages: number,
    currentPage: number,
    colors: ColorDto[]
}