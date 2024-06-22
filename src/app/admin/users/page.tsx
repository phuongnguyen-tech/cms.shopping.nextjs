'use client'

import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material'
import useSWR from 'swr'
import { withAuth } from '@/utils/withAuth'
import { useRouter } from 'next/navigation'
import { baseUrl } from '@/utils/baseUrl'
import userApiRequest from '@/apiServices/user/route'
import { useState } from 'react'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function User() {
  const router = useRouter()
  const [page, setPage] = useState(0)
  const [filter, setFilter] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value.toLowerCase())
  }

  const { data, error, isValidating } = useSWR(`${baseUrl}/users`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  if (isValidating) return <div>loading...</div>
  if (error) return <div>failed to load</div>
  if (!data || !data.users || data.users.length === 0) return <div>No users found</div>

  const userList = data.users

  const handleCreate = () => {
    router.push('users/create')
  }

  const handleDelete = async (userId: string) => {
    try {
      await userApiRequest.delete(userId)
      // Optionally refetch the data to update the list
      router.refresh()
    } catch (error) {
      console.error('Failed to delete user:', error)
    }
  }

  const filteredUsers = userList.filter(
    (user: any) =>
      user.name.toLowerCase().includes(filter) ||
      user.username.toLowerCase().includes(filter) ||
      user.email.toLowerCase().includes(filter),
  )

  return (
    <Container maxWidth="lg">
      <div className="flex justify-end my-3">
        <TextField
          label="Search Users"
          variant="outlined"
          value={filter}
          onChange={handleFilterChange}
          style={{ marginRight: '1rem' }}
        />
        <Button variant="contained" onClick={handleCreate}>
          Create User
        </Button>
      </div>
      <Table sx={{ minWidth: 750 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((user: any) => (
              <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => router.push(`users/${user.id}`)}
                    sx={{ marginRight: 1 }}
                    variant="contained"
                  >
                    View
                  </Button>
                  <Button
                    sx={{ marginRight: 1 }}
                    variant="contained"
                    color="warning"
                    onClick={() => router.push(`users/${user.id}/update`)}
                  >
                    Edit
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(user.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
    

  )
}

export default withAuth(User)
