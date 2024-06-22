import loginUser from '@/apiServices/login/route'
import { removeTokenFromCookie } from './cookies'

export async function loginUserAcount(username: string, password: string): Promise<string | null> {
  try {
    const token = await loginUser(username, password) // Call loginUser with username and password

    if (token) {
      return token // Return the token if it exists
    } else {
      console.error('Login failed: Invalid response format')
      return null
    }
  } catch (error) {
    console.error('Login failed:', error)
    return null
  }
}

export async function logoutUser(): Promise<void> {
  try {
    removeTokenFromCookie()
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
