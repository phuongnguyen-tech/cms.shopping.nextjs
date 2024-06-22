'use client'

import userApiRequest from '@/apiServices/user/route'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

function UserDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, setValue } = useForm<UserForm>()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await userApiRequest.getDetail(id)
        const user = Array.isArray(userData) ? userData[0] : userData
        setUser(user)
        setValue('name', user.name)
        setValue('username', user.username)
        setValue('email', user.email)
        setValue('password', user.password)
        setLoading(false)
      } catch (error) {
        setError('Error fetching user data')
        setLoading(false)
      }
    }

    fetchUser()
  }, [id, setValue])

  const onSubmit = async (data: UserForm) => {
    // You can handle form submission here
    console.log(data)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h1>User Detail Page</h1>
      {user && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('name')} defaultValue={user.name} />
          <input {...register('username')} defaultValue={user.username} />
          <input {...register('email')} defaultValue={user.email} />
          <input {...register('password')} defaultValue={user.password} />

          <button type="submit">Submit</button>
        </form>
      )}
      <button onClick={() => router.push('/')}>Go Home</button>
    </div>
  )
}

export default UserDetail
