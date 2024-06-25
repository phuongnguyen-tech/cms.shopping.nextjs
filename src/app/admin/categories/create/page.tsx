'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import categoryApiRequest from '@/apiServices/categories/route'

export default function AddCategory() {
    const [open, setOpen] = useState(true)

    const router = useRouter()

    const handleClose = () => {
        setOpen(false)
        router.replace('/admin/categories')
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ICategory>()
    const onSubmit: SubmitHandler<ICategory> = async (data) => {
        try {
            const json = await categoryApiRequest.create(data) // Call the API utility function
            console.log(json)
            handleClose()
        } catch (error) {
            console.error('Error:', error)
        }
    }
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            {...register('name', { required: 'Name is required' })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit" variant="contained">
                                Submit
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
