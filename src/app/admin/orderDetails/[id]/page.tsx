'use client'

import orderDetailApiRequest from '@/apiServices/orderDetail/route'
import { TextField, Button, CircularProgress, Typography, Box, FormControl } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

function OrderDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const { id } = params
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IOrderDetail>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const orderDetail = await orderDetailApiRequest.getDetail(id)
                setValue('id', orderDetail.id)
                setValue('orderId', orderDetail.orderId)
                setValue('productId', orderDetail.productId)
                setValue('quantity', orderDetail.quantity)
                setValue('unitPrice', orderDetail.unitPrice)
                setValue('createdAt', orderDetail.createdAt)
            } catch (error) {
                setError('Failed to fetch order detail data')
            } finally {
                setLoading(false)
            }
        }

        fetchOrderDetail()
    }, [id, setValue])

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
            <FormControl>
                <TextField
                    {...register('id')}
                    label="ID"
                    variant="standard"
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    {...register('orderId')}
                    label="Order ID"
                    variant="standard"
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    {...register('productId')}
                    label="Product ID"
                    variant="standard"
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    {...register('quantity')}
                    label="Quantity"
                    variant="standard"
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                    margin="normal"
                    error={!!errors.quantity}
                    helperText={errors.quantity ? errors.quantity.message : ''}
                />
                <TextField
                    {...register('unitPrice')}
                    label="Unit Price"
                    variant="standard"
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                    margin="normal"
                    error={!!errors.unitPrice}
                    helperText={errors.unitPrice ? errors.unitPrice.message : ''}
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
            </FormControl>
            <Button
                onClick={() => router.push('/admin/orderDetails')}
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}>
                Go Home
            </Button>
        </Box>
    )
}

export default OrderDetailPage
