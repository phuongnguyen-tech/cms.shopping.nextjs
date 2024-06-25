/* eslint-disable @next/next/no-img-element */
'use client'

import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
} from '@mui/material'
import useSWR from 'swr'
import { withAuth } from '@/utils/withAuth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { baseUrl } from '@/utils/baseUrl'
import AddOrderDetail from './create/page'
import EditOrderDetail from './[id]/update/page'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import orderDetailApiRequest from '@/apiServices/orderDetail/route'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function OrderDetail() {
    const router = useRouter()
    // State và handler cho phân trang
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const [orderDetailId, setOrderDetailId] = useState<string>('')
    const [showCreate, setShowCreate] = useState<boolean>(false)
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const [filter, setFilter] = useState('')

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage)
    }

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value.toLowerCase())
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }
    const { data, error, isLoading } = useSWR(`${baseUrl}/orderDetails`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    const filteredOrderDetails = data.filter(
        (data: IOrderDetail) =>
            data.orderId.toLowerCase().includes(filter) ||
            data.productId.toLowerCase().includes(filter),
    )

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 2 }}>
                <div className="flex justify-end mt-3 mr-4">
                    <TextField
                        label="Filter"
                        variant="outlined"
                        value={filter}
                        onChange={handleFilterChange}
                        style={{ marginRight: '1rem' }}
                        size="small"
                    />
                    <Button onClick={() => setShowCreate(true)} variant="contained">
                        Create Order Detail
                    </Button>
                </div>
                <TableContainer sx={{ maxHeight: 540 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow className="uppercase ">
                                <TableCell className="font-medium">Order ID</TableCell>
                                <TableCell className="font-medium">Product ID</TableCell>
                                <TableCell className="font-medium">Quantity</TableCell>
                                <TableCell className="font-medium">Unit Price</TableCell>
                                <TableCell className="font-medium">Created At</TableCell>
                                <TableCell className="font-medium">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredOrderDetails
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Cắt danh sách chi tiết đơn hàng theo trang
                                .map((detail: IOrderDetail) => (
                                    <TableRow
                                        key={detail.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell>{detail.orderId}</TableCell>
                                        <TableCell>{detail.productId}</TableCell>
                                        <TableCell>{detail.quantity}</TableCell>
                                        <TableCell>{detail.unitPrice}</TableCell>
                                        <TableCell>{detail.createdAt}</TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() =>
                                                    router.push(`order-details/${detail.id}`)
                                                }
                                                sx={{ marginRight: 1 }}
                                                variant="contained"
                                                size="small">
                                                <VisibilityRoundedIcon />
                                            </Button>
                                            <Button
                                                sx={{ marginRight: 1 }}
                                                variant="contained"
                                                color="warning"
                                                onClick={() => {
                                                    setOrderDetailId(detail.id)
                                                    setShowEdit(true)
                                                }}
                                                size="small">
                                                <BorderColorRoundedIcon />
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() =>
                                                    orderDetailApiRequest.delete(detail.id)
                                                }
                                                size="small">
                                                <DeleteForeverIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredOrderDetails.length} // Tổng số chi tiết đơn hàng
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <AddOrderDetail showCreate={showCreate} setShowCreate={setShowCreate} />
            <EditOrderDetail
                showEdit={showEdit}
                setShowEdit={setShowEdit}
                orderDetailId={orderDetailId}
                setOrderDetailId={setOrderDetailId}
            />
        </>
    )
}

export default withAuth(OrderDetail)
