'use client'

import { logoutUser } from '@/utils/auth'
import { useRouter } from 'next/navigation'

const LogoutButton = () => {
  const router = useRouter()

  const handleLogout = async () => {
    await logoutUser()
    router.push('/login') // Chuyển hướng về trang đăng nhập sau khi đăng xuất
  }

  return <button onClick={handleLogout}>Logout</button>
}

export default LogoutButton
