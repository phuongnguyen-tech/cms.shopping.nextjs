'use client'

// Import necessary modules and components
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import customerApiRequest from '@/apiServices/customer/route'

interface IProps {
    showEdit: boolean
    setShowEdit: (v: boolean) => void
    customerId: string
    setCustomerId: (v: string) => void
}

export default function EditCustomer(props: IProps) {
    const { showEdit, setShowEdit } = props
    const { customerId } = props

    const [customer, setCustomer] = useState<ICustomer | null>(null)
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ICustomer>()

    // Fetch user data based on ID when component mounts
    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const detail = await customerApiRequest.getDetail(customerId)
                setCustomer(detail)
                setValue('id', detail.id)
                setValue('firstName', detail.firstName)
                setValue('lastName', detail.lastName)
                setValue('email', detail.email)
                setValue('phone', detail.phone)
                setValue('address', detail.address)
                setValue('password', detail.password)
            } catch (error) {
                console.log('Error: ', error)
            }
        }

        fetchCustomer()
    }, [customerId, setValue])

    // Function to handle form submission
    const onSubmit = async (data: ICustomer) => {
        try {
            const json = await customerApiRequest.update(customerId, data)
            setShowEdit(false)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    // If user data is not loaded yet, display Loading message
    if (!customer) {
        return <div>Loading...</div>
    }

    // Render the Dialog with form fields
    return (
        <Dialog open={showEdit} onClose={() => setShowEdit(false)}>
            <DialogTitle>Update Customer</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        {...register('id')}
                        label="Id"
                        variant="standard"
                        fullWidth
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        {...register('phone')}
                        label="Phone"
                        variant="standard"
                        fullWidth
                        required
                    />
                    {errors.phone && <span>This field is required</span>}
                    <TextField
                        {...register('email')}
                        label="Email"
                        variant="standard"
                        fullWidth
                        required
                    />
                    {errors.email && <span>This field is required</span>}
                    <TextField
                        {...register('password')}
                        type="password"
                        label="Password"
                        variant="standard"
                        fullWidth
                    />
                    {errors.password && <span>This field is required</span>}
                    <TextField
                        {...register('firstName')}
                        label="Name"
                        variant="standard"
                        fullWidth
                    />
                    <TextField
                        {...register('lastName')}
                        label="Name"
                        variant="standard"
                        fullWidth
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
