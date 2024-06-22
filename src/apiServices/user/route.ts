'use client'

import { baseUrl } from '@/utils/baseUrl'
import { mutate } from 'swr'

const userUrl = `${baseUrl}/users`

const userApiRequest = {
  getDetail: async (id: string) => {
    try {
      const response = await fetch(`${userUrl}/${id}`, {
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        cache: 'no-store',
      })
      if (!response.ok) {
        throw new Error('Failed to fetch user detail')
      }
      return response.json()
    } catch (error) {
      console.error('Error fetching user detail:', error)
      throw error
    }
  },
  create: async (body: UserForm) => {
    try {
      const response = await fetch(userUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(body),
      })
      if (!response.ok) {
        throw new Error('Failed to create user')
      }
      mutate(userUrl) // Invalidate cache
      return response.json()
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  },
  update: async (id: string, body: UserForm) => {
    try {
      const response = await fetch(`${userUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(body),
      })
      if (!response.ok) {
        throw new Error('Failed to update user')
      }
      mutate(userUrl) // Invalidate cache
      return response.json()
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  },
  delete: async (id: string) => {
    try {
      const response = await fetch(`${userUrl}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      })
      if (!response.ok) {
        throw new Error('Failed to delete user')
      }
      mutate(userUrl) // Invalidate cache
      return response.json()
    } catch (error) {
      console.error('Error deleting user:', error)
      throw error
    }
  },
  getProfile: async (username: string) => {
    try {
      const response = await fetch(`${userUrl}/profile`, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch user profile')
      }

      return response.json()
    } catch (error) {
      console.error('Error:', error)
      throw error
    }
  },
}

export default userApiRequest
