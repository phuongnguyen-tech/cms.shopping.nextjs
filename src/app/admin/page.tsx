'use client'

import { withAuth } from '@/utils/withAuth'
import { Button } from '@mui/material'
import Link from 'next/link'

function AdminPage() {
  return (
    <>
      <h2>Hello admin</h2>
      <Link href="admin/products">
        <Button variant="contained">Go to product</Button>
      </Link>
    </>
  )
}

export default withAuth(AdminPage)
