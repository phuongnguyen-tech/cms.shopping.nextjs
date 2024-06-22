'use client'

/* eslint-disable react/display-name */
import { useEffect, useState } from 'react'
import { getTokenFromCookie } from './cookies'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import '@/styles/globals.css'
import { useRouter } from 'next/navigation'

export function withAuth<T extends { children?: React.ReactNode }>(
  Component: React.ComponentType<T>,
) {
  return (props: T) => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
      const token = getTokenFromCookie()
      if (!token) {
        router.push('/login') // Chuyển hướng về trang đăng nhập nếu chưa đăng nhập
      } else {
        setAuthenticated(true)
      }
      setLoading(false)
    }, [router])

    if (loading) {
      return (
        <Box className="loading-container">
          <CircularProgress />
        </Box>
      )
    }

    if (!authenticated) {
      return null // Hoặc bạn có thể hiển thị một component khác nếu cần
    }

    return <Component {...props} />
  }
}
