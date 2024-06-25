import { useForm, SubmitHandler } from 'react-hook-form'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    Select,
    TextField,
    MenuItem,
} from '@mui/material'
import { useEffect, useState } from 'react'
import customerApiRequest from '@/apiServices/customer/route'
import orderApiRequest from '@/apiServices/order/route'

interface IProps {
    showCreate: boolean
    setShowCreate: (v: boolean) => void
}

enum OrderStatus {
    Processing = 'Processing', //Đang xử lý = 'Đang xử lý',
    Shipped = 'Shipped', //Đã giao = 'Đã giao',
    Delivered = 'Delivered', //Đã giao = 'Đã giao',
    Cancelled = 'Cancelled', //Đã hủy = 'Đã hủy',
}

export default function AddOrder(props: IProps) {
    const { showCreate, setShowCreate } = props
    const [status, setStatus] = useState<OrderStatus>(OrderStatus.Processing)
    const [customers, setCustomers] = useState<Customer[]>([])
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IOrder>()

    useEffect(() => {
        async function fetchCustomers() {
            try {
                const customerList = await customerApiRequest.getDropdown()
                setCustomers(customerList)
            } catch (error) {
                console.error('Error fetching customers:', error)
            }
        }
        fetchCustomers()
    }, [])

    const onSubmit: SubmitHandler<IOrder> = async (data) => {
        try {
            const json = await orderApiRequest.create(data) // Call the API utility function
            console.log(json)
            reset()
            setShowCreate(false)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <Dialog open={showCreate} onClose={() => setShowCreate(false)}>
            <DialogTitle>Add New Order</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl fullWidth className="py-4 mt-4">
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                            labelId="status-label"
                            id="status"
                            value={status}
                            label="Status"
                            {...register('status', {
                                required: 'Status is required',
                            })}
                            onChange={(e) => setStatus(e.target.value as OrderStatus)}>
                            {Object.values(OrderStatus).map((status) => (
                                <MenuItem key={status} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="customer-label">Customer</InputLabel>
                        <Select
                            labelId="customer-label"
                            id="customer"
                            {...register('customerId', {
                                required: 'Customer is required',
                            })}>
                            {customers.map((customer) => (
                                <MenuItem key={customer.id} value={customer.id}>
                                    {customer.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        margin="dense"
                        id="orderDate"
                        label="Order Date"
                        type="text"
                        fullWidth
                        variant="standard"
                        {...register('orderDate')}
                    />
                    <TextField
                        margin="dense"
                        id="totalAmount"
                        label="Total Amount"
                        type="text" // Sử dụng type="text" thay vì type="number"
                        fullWidth
                        variant="standard"
                        {...register('totalAmount', {
                            required: 'Total amount is required',
                            pattern: {
                                value: /^\d*\.?\d*$/, // Đối tượng hợp lệ cho phép nhập số thập phân
                                message: 'Invalid total format',
                            },
                            min: {
                                value: 0,
                                message: 'Total amount must be at least 0',
                            },
                        })}
                        error={!!errors.totalAmount}
                        helperText={errors.totalAmount?.message}
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
