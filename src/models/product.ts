interface IProduct {
    id: string
    name: string
    description?: string
    price: number
    bannerUrl: string
    quantity: number
    categoryId?: string
    createdAt: string
}

interface Product {
    id: string
    name: string
}
