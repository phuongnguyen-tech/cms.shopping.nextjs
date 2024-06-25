'use client'

import productApiRequest from '@/apiServices/product/route'
import { TextField, Button, CircularProgress, Typography, Box } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

function ProdDetail({ params }: { params: { id: string } }) {
    const router = useRouter()
    const { id } = params
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IProduct>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const prodData = await productApiRequest.getDetail(id)
                const prod = Array.isArray(prodData) ? prodData[0] : prodData
                setValue('id', prod.id)
                setValue('bannerUrl', prod.bannerUrl)
                setValue('name', prod.name)
                setValue('price', prod.price)
                setValue('quantity', prod.quantity)
                setValue('description', prod.description ?? '')
                setValue('categoryId', prod.categoryId ?? '')
                setValue('createdAt', prod.createdAt ?? '')
            } catch (error) {
                setError('Failed to fetch product data')
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [id, setValue])

    const onSubmit = async (data: IProduct) => {
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
                Product Detail Page
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    {...register('bannerUrl')}
                    label="Banner Url"
                    variant="standard"
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    {...register('name')}
                    label="Name"
                    variant="standard"
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    {...register('price')}
                    label="Price"
                    variant="standard"
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                    margin="normal"
                    error={!!errors.price}
                    helperText={errors.price ? errors.price.message : ''}
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
                />
                <TextField
                    {...register('description')}
                    label="Description"
                    variant="standard"
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    {...register('categoryId')}
                    label="Category ID"
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
                onClick={() => router.push('/admin/products')}
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}>
                Go Home
            </Button>
        </Box>
    )
}

export default ProdDetail
