'use client'

import categoryApiRequest from '@/apiServices/categories/route'
import { Box, Button, TextField, CircularProgress, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function UpdateUserModal({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICategory>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCate = async () => {
      try {
        const cateData = await categoryApiRequest.getDetail(id)
        const cate = Array.isArray(cateData) ? cateData[0] : cateData
        setValue('id', cate.id)
        setValue('name', cate.name)
        setLoading(false)
      } catch (error) {
        setError('Failed to fetch category details')
      } finally {
        setLoading(false)
      }
    }

    fetchCate()
  }, [id, setValue])

  const onSubmit = async (data: ICategory) => {
    try {
      const json = await categoryApiRequest.update(id, data)
      console.log(json)
      router.push('/categories') // Redirect to home after update
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (loading) {
    return <CircularProgress />
  }

  if (error) {
    return <Typography color="error">{error}</Typography>
  }

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch', marginTop: 1 },
      }}
      noValidate
      display="flex"
      flexDirection="column"
      autoComplete="off"
      alignItems="center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        {...register('id')}
        label="ID"
        variant="standard"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        {...register('name', { required: 'Name is required' })}
        label="Name"
        variant="standard"
        error={!!errors.name}
        helperText={errors.name ? errors.name.message : ''}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  )
}
