'use client'

import orderDetailApiRequest from '@/apiServices/orderDetail/route'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IProps {
    showEdit: boolean
    setShowEdit: (v: boolean) => void
    orderDetailId: string
    setOrderDetailId: (v: string) => void
}

export default function EditOrderDetail(props: IProps) {
    const { showEdit, setShowEdit, orderDetailId } = props

    const [orderDetail, setOrderDetail] = useState<IOrderDetail | null>(null)
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IOrderDetail>()

    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const orderDetail = await orderDetailApiRequest.getDetail(orderDetailId)
                setOrderDetail(orderDetail)
                setValue('id', orderDetail.id)
                setValue('orderId', orderDetail.orderId)
                setValue('productId', orderDetail.productId)
                setValue('quantity', orderDetail.quantity)
                setValue('unitPrice', orderDetail.unitPrice)
                setValue('createdAt', orderDetail.createdAt)
            } catch (error) {
                console.log('Error: ', error)
            }
        }

        fetchOrderDetail()
    }, [orderDetailId, setValue])

    const onSubmit: SubmitHandler<IOrderDetail> = async (data) => {
        try {
            const json = await orderDetailApiRequest.update(orderDetailId, data)
            console.log(json)
            setShowEdit(false)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    if (!orderDetail) {
        return <div>Loading...</div>
    }

    return (
        <Dialog open={showEdit} onClose={() => setShowEdit(false)}>
            <DialogTitle>Edit Order Detail</DialogTitle>
            <DialogContent>
                <FormControl onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        defaultValue={orderDetailId}
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
                        {...register('orderId')}
                        label="Order ID"
                        variant="standard"
                    />
                    <TextField
                        fullWidth
                        {...register('productId')}
                        label="Product ID"
                        variant="standard"
                    />
                    <TextField
                        {...register('quantity', {
                            min: {
                                value: 1,
                                message: 'Quantity cannot be less than 1',
                            },
                        })}
                        fullWidth
                        label="Quantity"
                        variant="standard"
                        error={!!errors.quantity}
                        helperText={errors.quantity ? errors.quantity.message : ''}
                    />
                    <TextField
                        {...register('unitPrice', {
                            min: {
                                value: 0,
                                message: 'Unit Price cannot be less than 0',
                            },
                        })}
                        fullWidth
                        label="Unit Price"
                        variant="standard"
                        error={!!errors.unitPrice}
                        helperText={errors.unitPrice ? errors.unitPrice.message : ''}
                    />
                    <TextField
                        fullWidth
                        {...register('createdAt')}
                        label="Created At"
                        variant="standard"
                    />
                    <DialogActions>
                        <Button onClick={() => setShowEdit(false)}>Cancel</Button>
                        <Button type="submit" variant="contained">
                            Submit
                        </Button>
                    </DialogActions>
                </FormControl>
            </DialogContent>
        </Dialog>
    )
}
