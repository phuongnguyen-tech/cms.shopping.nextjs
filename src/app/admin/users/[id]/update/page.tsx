'use client'

// Import necessary modules and components
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import userApiRequest from '@/apiServices/user/route'

// Define the interface for User data
interface IUser {
  id: number
  name: string
  username: string
  email: string
  password: string
}

// Component to update user information in a Dialog
export default function UpdateUserModal({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params
  const [open, setOpen] = useState(false) // State for Dialog open/close
  const [user, setUser] = useState<IUser | null>(null) // State for user data
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IUser>() // React Hook Form

  function handleCloseDialog() {
    setOpen(false) // Close the dialog
    setIsLoading(false) // Set isLoading to false after closing the dialog

    // Use router.replace instead of router.push to replace the current URL with a new one
    router.replace('/admin/users')
  }

  // Fetch user data based on ID when component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await userApiRequest.getDetail(id)
        const user = Array.isArray(userData) ? userData[0] : userData
        setUser(user)
        // Set form values using setValue from React Hook Form
        setValue('id', user.id)
        setValue('name', user.name)
        setValue('username', user.username)
        setValue('email', user.email)
        setValue('password', user.password)
        setOpen(true) // Open the Dialog after fetching user data
      } catch (error) {
        console.log('Error: ', error)
      }
    }

    fetchUser()
  }, [id, setValue])

  // Function to handle form submission
  const onSubmit = async (data: IUser) => {
    try {
      const json = await userApiRequest.update(id, data)
      console.log(json)
      setOpen(false) // Close the Dialog after update
      router.push('admin/users') // Redirect to home after update
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // If user data is not loaded yet, display Loading message
  if (!user) {
    return <div>Loading...</div>
  }

  // Render the Dialog with form fields
  return (
    <Dialog open={open} onClose={() => handleCloseDialog()}>
      <DialogTitle>Update User</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('id')}
            label="Id"
            variant="standard"
            fullWidth
            defaultValue={id}
            InputProps={{ readOnly: true }}
          />
          <TextField {...register('name')} label="Name" variant="standard" fullWidth />
          <TextField {...register('username')} label="Username" variant="standard" fullWidth />
          <TextField {...register('email')} label="Email" variant="standard" fullWidth />
          <TextField
            {...register('password')}
            type="password"
            label="Password"
            variant="standard"
            fullWidth
          />
          {errors.password && <span>This field is required</span>}
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}
