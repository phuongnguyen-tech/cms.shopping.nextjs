'use client'

import { baseUrl } from '@/utils/baseUrl'
import { mutate } from 'swr'

const customerUrl = `${baseUrl}/customers`

const customerApiRequest = {
    getDetail: async (id: string) => {
        try {
            const response = await fetch(`${customerUrl}/${id}`, {
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                cache: 'no-store',
            })
            if (!response.ok) {
                throw new Error('Failed to fetch customer detail')
            }
            return response.json()
        } catch (error) {
            console.error('Error fetching customer detail:', error)
            throw error
        }
    },
    create: async (body: ICustomer) => {
        try {
            const response = await fetch(customerUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(body),
            })
            if (!response.ok) {
                throw new Error('Failed to create customer')
            }
            mutate(customerUrl) // Invalidate cache
            return response.json()
        } catch (error) {
            console.error('Error creating customer:', error)
            throw error
        }
    },
    update: async (id: string, body: ICustomer) => {
        try {
            const response = await fetch(`${customerUrl}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(body),
            })
            if (!response.ok) {
                throw new Error('Failed to update customer')
            }
            mutate(customerUrl) // Invalidate cache
            return response.json()
        } catch (error) {
            console.error('Error updating customer:', error)
            throw error
        }
    },
    delete: async (id: string) => {
        try {
            const response = await fetch(`${customerUrl}/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            })
            if (!response.ok) {
                throw new Error('Failed to delete customer')
            }
            mutate(customerUrl) // Invalidate cache
            return response.json()
        } catch (error) {
            console.error('Error deleting customer:', error)
            throw error
        }
    },
    getProfile: async (customername: string) => {
        try {
            const response = await fetch(`${customerUrl}/profile`, {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            })

            if (!response.ok) {
                throw new Error('Failed to fetch customer profile')
            }

            return response.json()
        } catch (error) {
            console.error('Error:', error)
            throw error
        }
    },
    getDropdown: async () => {
        try {
            const response = await fetch(`${customerUrl}/getDropdown`, {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            })

            if (!response.ok) {
                throw new Error('Failed to fetch customer')
            }

            return response.json()
        } catch (error) {
            console.error('Error:', error)
            throw error
        }
    },
}

export default customerApiRequest
