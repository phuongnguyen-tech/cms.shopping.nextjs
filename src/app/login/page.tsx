'use client'

import { Alert, Box, Button, Collapse, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'
import { saveTokenToCookie } from '@/utils/cookies'
import { loginUserAcount } from '@/utils/auth'

interface Login {
  username: string
  password: string
}

export default function Login() {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<Login>()
  const [error, setErrorMessage] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  const onSubmit = async (form: Login) => {
    try {
      const token = await loginUserAcount(form.username, form.password)
      if (token) {
        saveTokenToCookie(token)
        setSuccess('Login successful!')
        setErrorMessage(null)
        clearErrors()
        setTimeout(() => {
          router.push('/') // Chuyển hướng đến trang chính sau khi đăng nhập thành công
        }, 1000) // 1 giây chờ
      } else {
        setErrorMessage('Invalid username or password')
        setSuccess(null)
        setError('username', { type: 'manual', message: ' ' })
        setError('password', { type: 'manual', message: ' ' })
      }
    } catch (error) {
      setErrorMessage('Invalid username or password')
      setSuccess(null)
      setError('username', { type: 'manual', message: ' ' })
      setError('password', { type: 'manual', message: ' ' })
      console.error('Error:', error)
    }
  }

  return (
    <Box justifyContent="center" alignItems="center" textAlign="center">
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, marginTop: 1 },
        }}
        noValidate
        display="flex"
        flexDirection="column"
        autoComplete="off"
        alignItems="center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Collapse
          className="flex justify-center"
          in={!!error || !!success}
          sx={{ width: '60%', mb: 2 }}
        >
          {error && (
            <Alert className="text-center my-6" severity="error">
              {error}
            </Alert>
          )}
          {success && (
            <Alert className="my-6" severity="success">
              {success}
            </Alert>
          )}
        </Collapse>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={{ required: 'Username is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ width: '40%' }}
              margin="normal"
              label="Username"
              variant="outlined"
              error={!!errors.username}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: 'Password is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ width: '40%' }}
              margin="normal"
              label="Password"
              type="password"
              variant="outlined"
              error={!!errors.password}
              // helperText={errors.password ? 'Invalid username or password' : ''}
            />
          )}
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
      </Box>
    </Box>
  )
}
