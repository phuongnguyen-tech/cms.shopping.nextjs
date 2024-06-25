'use client'

import { baseUrl } from '@/utils/baseUrl'
import { mutate } from 'swr'

const orderUrl = `${baseUrl}/orders`

const orderApiRequest = {
    getList: async () => {
        try {
            const response = await fetch(`${orderUrl}}`, {
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                cache: 'no-store',
            })
            if (!response.ok) {
                throw new Error('Failed to fetch orders')
            }
            return response.json()
        } catch (error) {
            console.error('Error fetching orders:', error)
            throw error
        }
    },
    getDetail: async (id: string) => {
        try {
            const response = await fetch(`${orderUrl}/${id}`, {
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                cache: 'no-store',
            })
            if (!response.ok) {
                throw new Error('Failed to fetch order detail')
            }
            return response.json()
        } catch (error) {
            console.error('Error fetching order detail:', error)
            throw error
        }
    },
    create: async (body: IOrder) => {
        try {
            const response = await fetch(orderUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(body),
            })
            if (!response.ok) {
                throw new Error('Failed to create order')
            }
            mutate(orderUrl) // Invalidate cacheS
            return response.json()
        } catch (error) {
            console.error('Error creating order:', error)
            throw error
        }
    },
    update: async (id: string, body: IOrder) => {
        try {
            const response = await fetch(`${orderUrl}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(body),
            })
            if (!response.ok) {
                throw new Error('Failed to update order')
            }
            const data = response.status !== 204 ? await response.json() : null
            mutate(orderUrl) // Invalidate cacheS
            return data
        } catch (error) {
            console.error('Error updating order:', error)
            throw error
        }
    },
    delete: async (id: string) => {
        try {
            const response = await fetch(`${orderUrl}/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            })
            if (!response.ok) {
                throw new Error('Failed to delete order')
            }
            mutate(orderUrl) // Invalidate cache

            // Check if the response has a body before calling response.json()
            const data = response.status !== 204 ? await response.json() : null
            return data
        } catch (error) {
            console.error('Error deleting order:', error)
            throw error
        }
    },
}

export default orderApiRequest
