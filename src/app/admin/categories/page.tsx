'use client'

import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { baseUrl } from '@/utils/baseUrl'
import { withAuth } from '@/utils/withAuth'
import categoryApiRequest from '@/apiServices/categories/route'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function Category() {
  const router = useRouter()
  // State và handler cho phân trang
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const { data, error, isLoading } = useSWR(`${baseUrl}/categories`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  function handleCreate() {
    router.push('categories/create')
  }

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0) // Reset về trang đầu tiên khi thay đổi số lượng sản phẩm trên mỗi trang
  }

  return (
    <>
      <Container maxWidth="lg">
        <div className="flex justify-end my-3">
          <Button variant="contained" onClick={() => handleCreate()}>
            Create Category
          </Button>
        </div>
        <TableContainer component={Table}>
          <Table sx={{ minWidth: 750 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Cắt danh sách sản phẩm theo trang
                .map((cate: any) => (
                  <TableRow
                    key={cate.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{cate.id}</TableCell>
                    <TableCell>{cate.name}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => router.push(`categories/${cate.id}`)}
                        sx={{ marginRight: 1 }}
                        variant="contained"
                      >
                        View
                      </Button>
                      <Button
                        sx={{ marginRight: 1 }}
                        variant="contained"
                        color="warning"
                        onClick={() => router.push(`categories/${cate.id}/update`)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => categoryApiRequest.delete(cate.id)}
                      >
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
            count={data.length} // Tổng số sản phẩm
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Container>
    </>
  )
}

export default withAuth(Category)
