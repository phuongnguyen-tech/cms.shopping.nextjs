'use client'

import customerApiRequest from '@/apiServices/customer/route'
import { TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

function UserDetail({ params }: { params: { id: string } }) {
    const router = useRouter()
    const { id } = params
    const [customer, setCustomer] = useState<ICustomer | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const { register, setValue } = useForm<ICustomer>()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const detail = await customerApiRequest.getDetail(id)
                setCustomer(detail)
                setValue('phone', detail.phone)
                setValue('email', detail.email)
                setValue('password', detail.password)
                setValue('firstName', detail.firstName)
                setValue('lastName', detail.lastName)
                setLoading(false)
            } catch (error) {
                setError('Error fetching user data')
                setLoading(false)
            }
        }

        fetchUser()
    }, [id, setValue])

    return (
        <div>
            <h1>Customer Detail Page</h1>
            {customer && (
                <form>
                    <TextField
                        {...register('id')}
                        label="Id"
                        variant="standard"
                        fullWidth
                        defaultValue={id}
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        {...register('phone')}
                        label="Phone"
                        variant="standard"
                        fullWidth
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        {...register('email')}
                        label="Email"
                        variant="standard"
                        fullWidth
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        {...register('password')}
                        type="password"
                        label="Password"
                        variant="standard"
                        fullWidth
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        {...register('firstName')}
                        label="Name"
                        variant="standard"
                        fullWidth
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        {...register('lastName')}
                        label="Name"
                        variant="standard"
                        fullWidth
                        InputProps={{ readOnly: true }}
                    />
                </form>
            )}
            <button onClick={() => router.push('/admin/customers')}>Go Home</button>
        </div>
    )
}

export default UserDetail
