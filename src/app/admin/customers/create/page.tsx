'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import customerApiRequest from '@/apiServices/customer/route'

interface IProps {
    showCreate: boolean
    setShowCreate: (v: boolean) => void
}

export default function AddCustomer(props: IProps) {
    const { showCreate, setShowCreate } = props

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ICustomer>()

    const onSubmit: SubmitHandler<ICustomer> = async (data) => {
        try {
            const json = await customerApiRequest.create(data) // Call the API utility function
            console.log(json)
            reset()
            setShowCreate(false)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <Dialog open={showCreate} onClose={() => setShowCreate(false)}>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
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
