interface IProduct {
  id: string
  name: string
  description?: string
  price: number
  categoryId?: string
  bannerUrl: string
  slug: string
}

interface ProductForm {
  name: string
  description?: string
  price: number
  categoryId?: string
  bannerUrl: string
  slug: string
}
