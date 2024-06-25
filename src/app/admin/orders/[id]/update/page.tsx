'use client'

import orderApiRequest from '@/apiServices/order/route'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IProps {
    showEdit: boolean
    setShowEdit: (v: boolean) => void
    orderId: string
    setOrderId: (v: string) => void
}

export default function EditOrder(props: IProps) {
    const { showEdit, setShowEdit } = props
    const { orderId } = props

    const [order, setOrder] = useState<IOrder | null>(null)
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IOrder>()

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const orderData = await orderApiRequest.getDetail(orderId)
                setOrder(orderData)
                setValue('id', orderData.id)
                setValue('customerId', orderData.customerId)
                setValue('orderDate', orderData.orderDate)
                setValue('totalAmount', orderData.totalAmount.toString())
                setValue('status', orderData.status)
                setValue('createdAt', orderData.createdAt)
            } catch (error) {
                console.log('Error: ', error)
            }
        }

        fetchOrder()
    }, [orderId, setValue])

    const onSubmit: SubmitHandler<IOrder> = async (data) => {
        try {
            const json = await orderApiRequest.update(orderId, data)
            console.log(json)
            setShowEdit(false)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    if (!order) {
        return <div>Loading...</div>
    }

    return (
        <Dialog open={showEdit} onClose={() => setShowEdit(false)}>
            <DialogTitle>Edit Order</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        defaultValue={orderId}
                        {...register('id')}
                        label="Order ID"
                        fullWidth
                        variant="standard"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        fullWidth
                        {...register('customerId')}
                        label="Customer ID"
                        variant="standard"
                    />
                    <TextField
                        {...register('orderDate')}
                        label="Order Date"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        {...register('totalAmount', {
                            min: {
                                value: 0,
                                message: 'Total Amount cannot be less than 0',
                            },
                        })}
                        fullWidth
                        label="Total Amount"
                        variant="standard"
                        error={!!errors.totalAmount}
                        helperText={errors.totalAmount ? errors.totalAmount.message : ''}
                    />
                    <TextField
                        {...register('status')}
                        label="Status"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        fullWidth
                        {...register('createdAt')}
                        label="Created At"
                        variant="standard"
                        InputProps={{
                            readOnly: true,
                        }}
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
