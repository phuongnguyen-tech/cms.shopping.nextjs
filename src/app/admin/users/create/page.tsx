'use client'

import Button from '@mui/material/Button'
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import userApiRequest from '@/apiServices/user/route'

export default function AddNewUser() {
  const [open, setOpen] = useState(true)
  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  })

  const router = useRouter()

  const handleClose = () => {
    setOpen(false)
    router.replace('/admin/users')
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const result = await userApiRequest.create(form)
      console.log(result)
      handleClose()
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={form.name}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            id="username"
            name="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            value={form.username}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={form.password}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
