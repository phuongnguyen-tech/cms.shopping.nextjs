'use client'

import { baseUrl } from '@/utils/baseUrl'
import { mutate } from 'swr'

const categoryUrl = `${baseUrl}/categories`

const categoryApiRequest = {
  getDetail: async (id: string) => {
    try {
      const response = await fetch(`${categoryUrl}/${id}`, {
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        cache: 'no-store',
      })
      if (!response.ok) {
        throw new Error('Failed to fetch category detail')
      }
      return response.json()
    } catch (error) {
      console.error('Error fetching category detail:', error)
      throw error
    }
  },
  create: async (body: CategoryForm) => {
    try {
      const response = await fetch(categoryUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(body),
      })
      if (!response.ok) {
        throw new Error('Failed to create category')
      }
      mutate(categoryUrl) // Invalidate cache
      return response.json()
    } catch (error) {
      console.error('Error creating category:', error)
      throw error
    }
  },
  update: async (id: string, body: CategoryForm) => {
    try {
      const response = await fetch(`${categoryUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(body),
      })
      if (!response.ok) {
        throw new Error('Failed to update category')
      }
      mutate(categoryUrl) // Invalidate cache
      return response.json()
    } catch (error) {
      console.error('Error updating category:', error)
      throw error
    }
  },
  delete: async (id: string) => {
    try {
      const response = await fetch(`${categoryUrl}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      })
      if (!response.ok) {
        throw new Error('Failed to delete category')
      }
      mutate(categoryUrl) // Invalidate cache
      return response.json()
    } catch (error) {
      console.error('Error deleting category:', error)
      throw error
    }
  },
}

export default categoryApiRequest
