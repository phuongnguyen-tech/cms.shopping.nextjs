'use client'

import { withAuth } from '@/utils/withAuth'
import { redirect } from 'next/navigation'

function AdminPage(): never {
    redirect('/admin/products')
}

export default withAuth(AdminPage)
