'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import orderDetailApiRequest from '@/apiServices/orderDetail/route'

interface IProps {
    showCreate: boolean
    setShowCreate: (v: boolean) => void
}

export default function AddOrderDetail(props: IProps) {
    const { showCreate, setShowCreate } = props

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IOrderDetail>()

    const onSubmit: SubmitHandler<IOrderDetail> = async (data) => {
        try {
            const json = await orderDetailApiRequest.create(data) // Call the API utility function for OrderDetail
            console.log(json)
            reset()
            setShowCreate(false)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <Dialog open={showCreate} onClose={() => setShowCreate(false)}>
            <DialogTitle>Add New Order Detail</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="orderId"
                        label="Order ID"
                        type="text"
                        fullWidth
                        variant="standard"
                        {...register('orderId', { required: 'Order ID is required' })}
                        error={!!errors.orderId}
                        helperText={errors.orderId?.message}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="productId"
                        label="Product ID"
                        type="text"
                        fullWidth
                        variant="standard"
                        {...register('productId', { required: 'Product ID is required' })}
                        error={!!errors.productId}
                        helperText={errors.productId?.message}
                    />
                    <TextField
                        margin="dense"
                        id="quantity"
                        label="Quantity"
                        type="number"
                        fullWidth
                        variant="standard"
                        {...register('quantity', {
                            required: 'Quantity is required',
                            min: {
                                value: 1,
                                message: 'Quantity must be at least 1',
                            },
                        })}
                        error={!!errors.quantity}
                        helperText={errors.quantity?.message}
                    />
                    <TextField
                        margin="dense"
                        id="unitPrice"
                        label="Unit Price"
                        type="number"
                        fullWidth
                        variant="standard"
                        {...register('unitPrice', {
                            required: 'Unit Price is required',
                            min: {
                                value: 0,
                                message: 'Unit Price must be at least 0',
                            },
                        })}
                        error={!!errors.unitPrice}
                        helperText={errors.unitPrice?.message}
                    />
                    <DialogActions>
                        <Button onClick={() => setShowCreate(false)}>Cancel</Button>
                        <Button type="submit" variant="contained">
                            Submit
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    )
}
