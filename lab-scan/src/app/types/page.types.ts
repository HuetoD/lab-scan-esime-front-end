export interface Page<T> {

    data: T[]

    totalItems: number

    currentPage: number
    
    totalPages: number

}