export interface Color {
    _id: string,
    name: string,
    color: string,
    pantone: string
    year: number,
    isNew?: boolean
}

export interface ColorPagination {
    totalItems: number,
    itemsPerPage: number,
    numberPages: number,
    currentPage: number,
    colors: Color[]
}