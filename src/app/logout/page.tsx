'use client'

import { logoutAdmin } from '@/utils/auth'
import { useRouter } from 'next/navigation'
import LogoutIcon from '@mui/icons-material/Logout'
import { Button } from '@mui/material'

const LogoutButton = () => {
    const router = useRouter()

    const handleLogout = async () => {
        await logoutAdmin()
        router.push('/login') // Chuyển hướng về trang đăng nhập sau khi đăng xuất
    }

    return (
        <>
            <Button color="error" variant="contained" onClick={handleLogout}>
                Logout <LogoutIcon />
            </Button>
        </>
    )
}

export default LogoutButton
