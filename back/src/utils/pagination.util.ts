export const paginateByLimit = (array: any[], limit: number, offset: number) => {
    const totalItems = array.length
    const itemsPerPage = limit
    const numberPages = Math.ceil(totalItems / limit)
    const currentPage = totalItems > 0 ? (itemsPerPage + offset) / itemsPerPage : 0
    const newArray = array.slice(offset, totalItems).slice(0, itemsPerPage)
    return {
        totalItems,
        itemsPerPage,
        numberPages,
        currentPage,
        data: newArray
    }
}