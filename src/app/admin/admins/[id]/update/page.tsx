'use client'

import productApiRequest from '@/apiServices/product/route'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IProps {
    showEdit: boolean
    setShowEdit: (v: boolean) => void
    productId: string
    setProductId: (v: string) => void
}

export default function EditProduct(props: IProps) {
    const { showEdit, setShowEdit } = props
    const { productId } = props

    const [prod, setProd] = useState<IProduct | null>(null)
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IProduct>()

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const prodData = await productApiRequest.getDetail(productId)
                const prod = Array.isArray(prodData) ? prodData[0] : prodData
                setProd(prod)
                setValue('id', prod.id)
                setValue('bannerUrl', prod.bannerUrl)
                setValue('name', prod.name)
                setValue('price', prod.price)
                setValue('quantity', prod.quantity)
                setValue('description', prod.description)
                setValue('categoryId', prod.categoryId)
                setValue('createdAt', prod.createdAt)
            } catch (error) {
                console.log('Error: ', error)
            }
        }

        fetchProduct()
    }, [productId, setValue])

    const onSubmit: SubmitHandler<ProductForm> = async (data) => {
        try {
            const json = await productApiRequest.update(productId, data)
            console.log(json)
            setShowEdit(false)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    if (!prod) {
        return <div>Loading...</div>
    }

    return (
        <Dialog open={showEdit} onClose={() => setShowEdit(false)}>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        defaultValue={productId}
                        {...register('id')}
                        label="Id"
                        fullWidth
                        variant="standard"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        fullWidth
                        {...register('bannerUrl')}
                        label="Banner Url"
                        variant="standard"
                    />
                    <TextField fullWidth {...register('name')} label="Name" variant="standard" />
                    <TextField
                        {...register('price', {
                            min: {
                                value: 0,
                                message: 'Price cannot be less than 0',
                            },
                        })}
                        fullWidth
                        label="Price"
                        variant="standard"
                        error={!!errors.price}
                        helperText={errors.price ? errors.price.message : ''}
                    />
                    <TextField
                        fullWidth
                        {...register('quantity')}
                        label="Quantity"
                        variant="standard"
                    />

                    <TextField
                        fullWidth
                        {...register('description')}
                        label="Description"
                        variant="standard"
                    />

                    <TextField
                        fullWidth
                        {...register('categoryId')}
                        label="CategoryId"
                        variant="standard"
                    />
                    <TextField
                        fullWidth
                        {...register('createdAt')}
                        label="CreatedAt"
                        variant="standard"
                    />
                    <DialogActions>
                        <Button onClick={() => setShowEdit(false)}>Cancel</Button>
                        <Button type="submit" variant="contained">
                            Submit
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    )
}
