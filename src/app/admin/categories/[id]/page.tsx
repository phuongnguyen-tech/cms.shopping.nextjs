'use client'

import categoryApiRequest from '@/apiServices/categories/route'
import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

function CategoryDetail({ params }: { params: { id: string } }) {
    const { id } = params
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const { register, setValue } = useForm<ICategory>()

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const prodData = await categoryApiRequest.getDetail(id)
                const prod = Array.isArray(prodData) ? prodData[0] : prodData
                setValue('id', prod.id)
                setValue('name', prod.name)
            } catch (error) {
                setError('Failed to fetch product data')
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [id, setValue])

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div>
            <h1>Category Detail Page</h1>
            <form>
                <TextField
                    {...register('id')}
                    label="ID"
                    variant="standard"
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    {...register('name')}
                    label="Name"
                    variant="standard"
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                    margin="normal"
                />
            </form>
        </div>
    )
}

export default CategoryDetail
