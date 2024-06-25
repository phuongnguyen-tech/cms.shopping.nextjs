interface IOrder {
    id: string
    customerId: string
    orderDate: string
    totalAmount: number
    status: OrderStatus
    createdAt: string
}

enum OrderStatus {
    processing = 'Processing',
    shipped = 'Shipped',
    delivered = 'Delivered',
    cancelled = 'Cancelled',
}
