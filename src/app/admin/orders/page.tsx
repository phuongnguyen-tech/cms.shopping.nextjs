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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import orderApiRequest from '@/apiServices/order/route'
import AddOrder from './create/page'
import EditOrder from './[id]/update/page'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function Order() {
    const router = useRouter()
    // State và handler cho phân trang
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const [orderId, setOrderId] = useState<string>('')
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
        setPage(0) // Reset về trang đầu tiên khi thay đổi số lượng sản phẩm trên mỗi trang
    }
    const { data, error, isLoading } = useSWR(`${baseUrl}/orders`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    const filteredOrder = data.filter(
        (data: IOrder) =>
            data.status.toLowerCase().includes(filter) ||
            data.customerId!.toLowerCase().includes(filter),
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
                        Create Order
                    </Button>
                </div>
                <TableContainer sx={{ maxHeight: 540 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow className="uppercase ">
                                <TableCell className="font-medium">status</TableCell>
                                <TableCell className="font-medium">Customer</TableCell>
                                <TableCell className="font-medium">Order Date</TableCell>
                                <TableCell className="font-medium">total Amount</TableCell>
                                <TableCell className="font-medium">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredOrder
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Cắt danh sách sản phẩm theo trang
                                .map((order: IOrder) => (
                                    <TableRow
                                        key={order.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell>{order.status}</TableCell>
                                        <TableCell>{order.customerId}</TableCell>
                                        <TableCell>{order.orderDate}</TableCell>
                                        <TableCell>{order.totalAmount}</TableCell>
                                        <TableCell>{order.createdAt}</TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => router.push(`orders/${order.id}`)}
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
                                                    setOrderId(order.id)
                                                    setShowEdit(true)
                                                }}
                                                size="small">
                                                <BorderColorRoundedIcon />
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => orderApiRequest.delete(order.id)}
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
                    count={filteredOrder.length} // Tổng số sản phẩm
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <AddOrder showCreate={showCreate} setShowCreate={setShowCreate} />
            <EditOrder
                showEdit={showEdit}
                setShowEdit={setShowEdit}
                orderId={orderId}
                setOrderId={setOrderId}
            />
        </>
    )
}

export default withAuth(Order)
