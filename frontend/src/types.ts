export interface Auction {
    id: number,
    startTime: number,
    endTime: number,
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
    user: User,
    createdAt: string
}

export interface Category {
    id: number,
    name: string,
}


export interface Product {
    id: number,
    name: string,
    image: string,
    sold: boolean,
    description: string,
    category?: Category
}
export type CreateProduct = Omit<Product, 'id' | 'category'> & { categoryId: string }

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
    password: string
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