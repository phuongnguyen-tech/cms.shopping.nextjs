'use client'

import { baseUrl } from '@/utils/baseUrl'
import { mutate } from 'swr'

const productUrl = `${baseUrl}/products`

const productApiRequest = {
  getList: async () => {
    try {
      const response = await fetch(`${productUrl}}`, {
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        cache: 'no-store',
      })
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      return response.json()
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  },
  getDetail: async (id: string) => {
    try {
      const response = await fetch(`${productUrl}/${id}`, {
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        cache: 'no-store',
      })
      if (!response.ok) {
        throw new Error('Failed to fetch product detail')
      }
      return response.json()
    } catch (error) {
      console.error('Error fetching product detail:', error)
      throw error
    }
  },
  create: async (body: ProductForm) => {
    try {
      const response = await fetch(productUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(body),
      })
      if (!response.ok) {
        throw new Error('Failed to create product')
      }
      mutate(productUrl) // Invalidate cache
      return response.json()
    } catch (error) {
      console.error('Error creating product:', error)
      throw error
    }
  },
  update: async (id: string, body: ProductForm) => {
    try {
      const response = await fetch(`${productUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(body),
      })
      if (!response.ok) {
        throw new Error('Failed to update product')
      }
      const data = response.status !== 204 ? await response.json() : null
      return data
    } catch (error) {
      console.error('Error updating product:', error)
      throw error
    }
  },
  delete: async (id: string) => {
    try {
      const response = await fetch(`${productUrl}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      })
      if (!response.ok) {
        throw new Error('Failed to delete product')
      }
      mutate(productUrl) // Invalidate cache

      // Check if the response has a body before calling response.json()
      const data = response.status !== 204 ? await response.json() : null
      return data
    } catch (error) {
      console.error('Error deleting product:', error)
      throw error
    }
  },
}

export default productApiRequest
