'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import productApiRequest from '@/apiServices/product/route'

interface IProps {
  showCreate: boolean
  setShowCreate: (v: boolean) => void
}

export default function AddProduct(props: IProps) {
  const { showCreate, setShowCreate } = props

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductForm>()

  const onSubmit: SubmitHandler<ProductForm> = async (data) => {
    try {
      const json = await productApiRequest.create(data) // Call the API utility function
      console.log(json)
      reset()
      setShowCreate(false)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Dialog open={showCreate} onClose={() => setShowCreate(false)}>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            autoFocus
            margin="dense"
            id="bannerUrl"
            label="Banner Url"
            type="text"
            fullWidth
            variant="standard"
            {...register('bannerUrl', { required: 'Banner Url is required' })}
            error={!!errors.bannerUrl}
            helperText={errors.bannerUrl?.message}
          />
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
          <TextField
            margin="dense"
            id="price"
            label="Price"
            type="text" // Sử dụng type="text" thay vì type="number"
            fullWidth
            variant="standard"
            {...register('price', {
              required: 'Price is required',
              pattern: {
                value: /^\d*\.?\d*$/, // Đối tượng hợp lệ cho phép nhập số thập phân
                message: 'Invalid price format',
              },
              min: {
                value: 0,
                message: 'Price must be at least 0',
              },
            })}
            error={!!errors.price}
            helperText={errors.price?.message}
          />

          <TextField
            autoFocus
            margin="dense"
            id="slug"
            label="Slug"
            type="text"
            fullWidth
            variant="standard"
            {...register('slug', { required: 'Slug is required' })}
            error={!!errors.slug}
            helperText={errors.slug?.message}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            {...register('description')}
          />

          <TextField
            margin="dense"
            id="categoryId"
            label="Category ID"
            type="text"
            fullWidth
            variant="standard"
            {...register('categoryId')}
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
