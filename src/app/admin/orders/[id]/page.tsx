'use client'

import orderApiRequest from '@/apiServices/order/route'
import { TextField, Button, CircularProgress, Typography, Box } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function OrderDetail({ params }: { params: { id: string } }) {
    const router = useRouter()
    const { id } = params
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IOrder>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const order = await orderApiRequest.getDetail(id)
                setValue('id', order.id)
                setValue('customerId', order.customerId)
                setValue('orderDate', order.orderDate)
                setValue('totalAmount', order.totalAmount.toString())
                setValue('status', order.status)
                setValue('createdAt', order.createdAt ?? '')
            } catch (error) {
                setError('Failed to fetch order data')
            } finally {
                setLoading(false)
            }
        }

        fetchOrder()
    }, [id, setValue])

    const onSubmit = async (data: IOrder) => {
        console.log(data)
    }

    if (loading) {
        return <CircularProgress />
    }

    if (error) {
        return <Typography color="error">{error}</Typography>
    }

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Order Detail Page
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register('id')}
                    label="Order ID"
                    variant="standard"
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    {...register('customerId')}
                    label="Customer ID"
                    variant="standard"
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    {...register('orderDate')}
                    label="Order Date"
                    variant="standard"
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    {...register('totalAmount')}
                    label="Total Amount"
                    variant="standard"
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                    margin="normal"
                    error={!!errors.totalAmount}
                    helperText={errors.totalAmount ? errors.totalAmount.message : ''}
                />
                <TextField
                    {...register('status')}
                    label="Status"
                    variant="standard"
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    {...register('createdAt')}
                    label="Created At"
                    variant="standard"
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                    margin="normal"
                />
            </form>
            <Button
                onClick={() => router.push('/admin/orders')}
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}>
                Go Home
            </Button>
        </Box>
    )
}
