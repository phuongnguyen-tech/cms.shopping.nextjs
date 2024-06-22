'use client'

import React, { useEffect, useState } from 'react'
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { baseUrl } from '@/utils/baseUrl'
import SortProducts from '@/layout/products/sort'

async function fetchProducts(sortOrder: string) {
  const response = await fetch(`${baseUrl}/products?sort=${sortOrder}`, {
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    cache: 'no-store',
  })
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  return response.json()
}

export default function ProductCard() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<IProduct[]>([])
  const [error, setError] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<string>('')

  useEffect(() => {
    const sort = searchParams.get('sort') || 'asc'
    setSortOrder(sort)
    async function loadProducts() {
      try {
        const data = await fetchProducts(sort)
        setProducts(data)
      } catch (error) {
        setError('Failed to load products')
      }
    }

    loadProducts()
  }, [searchParams])

  if (error) {
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    )
  }

  return (
    <Box sx={{ flexGrow: 1, marginTop: 4 }}>
      <SortProducts />
      <Grid container spacing={4}>
        {products.map((prod: IProduct) => (
          <Grid key={prod.id} item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia component="img" height="180" image={prod.bannerUrl} alt="product image" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {prod.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {prod.description}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 2,
                  }}
                >
                  <Typography variant="h6" color="text.primary">
                    ${prod.price}
                  </Typography>
                  <Button variant="contained" color="primary">
                    Add to cart
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
