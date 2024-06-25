'use client'

import { baseUrl } from '@/utils/baseUrl'
import { mutate } from 'swr'

const orderDetailUrl = `${baseUrl}/orderDetails`

const orderDetailApiRequest = {
    getList: async () => {
        try {
            const response = await fetch(`${orderDetailUrl}}`, {
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                cache: 'no-store',
            })
            if (!response.ok) {
                throw new Error('Failed to fetch orderDetails')
            }
            return response.json()
        } catch (error) {
            console.error('Error fetching orderDetails:', error)
            throw error
        }
    },
    getDetail: async (id: string) => {
        try {
            const response = await fetch(`${orderDetailUrl}/${id}`, {
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                cache: 'no-store',
            })
            if (!response.ok) {
                throw new Error('Failed to fetch orderDetail detail')
            }
            return response.json()
        } catch (error) {
            console.error('Error fetching orderDetail detail:', error)
            throw error
        }
    },
    create: async (body: IOrderDetail) => {
        try {
            const response = await fetch(orderDetailUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(body),
            })
            if (!response.ok) {
                throw new Error('Failed to create orderDetail')
            }
            mutate(orderDetailUrl) // Invalidate cacheS
            return response.json()
        } catch (error) {
            console.error('Error creating orderDetail:', error)
            throw error
        }
    },
    update: async (id: string, body: IOrderDetail) => {
        try {
            const response = await fetch(`${orderDetailUrl}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(body),
            })
            if (!response.ok) {
                throw new Error('Failed to update orderDetail')
            }
            const data = response.status !== 204 ? await response.json() : null
            mutate(orderDetailUrl) // Invalidate cacheS
            return data
        } catch (error) {
            console.error('Error updating orderDetail:', error)
            throw error
        }
    },
    delete: async (id: string) => {
        try {
            const response = await fetch(`${orderDetailUrl}/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            })
            if (!response.ok) {
                throw new Error('Failed to delete orderDetail')
            }
            mutate(orderDetailUrl) // Invalidate cache

            // Check if the response has a body before calling response.json()
            const data = response.status !== 204 ? await response.json() : null
            return data
        } catch (error) {
            console.error('Error deleting orderDetail:', error)
            throw error
        }
    },
    getDropdown: async () => {
        try {
            const response = await fetch(`${orderDetailUrl}/getDropdown`, {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            })

            if (!response.ok) {
                throw new Error('Failed to fetch orderDetail')
            }

            return response.json()
        } catch (error) {
            console.error('Error:', error)
            throw error
        }
    },
}

export default orderDetailApiRequest
