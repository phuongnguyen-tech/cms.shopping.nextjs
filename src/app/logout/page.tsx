'use client'

import { logoutAdmin } from '@/apiServices/login/route'
import LogoutIcon from '@mui/icons-material/Logout'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'

const LogoutButton = () => {
    const router = useRouter()
    const handleLogout = async () => {
        await logoutAdmin()
        router.push('/login')
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
