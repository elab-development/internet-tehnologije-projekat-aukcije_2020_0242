export interface Auction {
    id: number,
    startTime: string,
    endTime: string,
    startPrice: number,
    user?: User,
    product: Product,
    bids: Bid[],
    status: AuctionStatus
}

export type AuctionStatus = 'active' | 'success' | 'failed'

export interface Bid {
    id: number,
    price: number,
    user: User
}


export interface Product {
    id: number,
    name: string,
    image: string,
    sold: boolean,
    description: string
}
export type CreateProduct = Omit<Product, 'sold' | 'id'>

export interface User {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    admin: boolean,

}

export interface RegisterUser {
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
}

export interface CreateAuction {
    startTime: string,
    endTime: string,
    startPrice: number,
    productId: number
}

export interface Pagination<T> {
    data: T[],
    page: number,
    total: number
}