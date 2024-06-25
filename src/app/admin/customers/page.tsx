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
import customerApiRequest from '@/apiServices/customer/route'
import AddCustomer from './create/page'
import EditCustomer from './[id]/update/page'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function Customer() {
    const router = useRouter()
    // State và handler cho phân trang
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const [customerId, setCustomerId] = useState<string>('')
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
    const { data, error, isLoading } = useSWR(`${baseUrl}/customers`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    const filteredCustomer = data.filter(
        (data: ICustomer) =>
            data.phone.toLowerCase().includes(filter) ||
            data.email.toLowerCase().includes(filter) ||
            data.firstName?.toLowerCase().includes(filter) ||
            data.lastName?.toLowerCase().includes(filter),
    )

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 2 }}>
                <div className="flex justify-end mt-3 mr-4">
                    <TextField
                        label="Filter name, description, slug "
                        variant="outlined"
                        value={filter}
                        onChange={handleFilterChange}
                        style={{ marginRight: '1rem' }}
                        size="small"
                    />
                    <Button onClick={() => setShowCreate(true)} variant="contained">
                        Create Customer
                    </Button>
                </div>
                <TableContainer sx={{ maxHeight: 540 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Phone</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>FirstName</TableCell>
                                <TableCell>LastName</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredCustomer
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Cắt danh sách sản phẩm theo trang
                                .map((customer: ICustomer) => (
                                    <TableRow
                                        key={customer.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell>{customer.phone}</TableCell>
                                        <TableCell>{customer.email}</TableCell>
                                        <TableCell>{customer.firstName}</TableCell>
                                        <TableCell>{customer.lastName}</TableCell>
                                        <TableCell>{customer.address}</TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() =>
                                                    router.push(`customers/${customer.id}`)
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
                                                    setCustomerId(customer.id)
                                                    setShowEdit(true)
                                                }}
                                                size="small">
                                                <BorderColorRoundedIcon />
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() =>
                                                    customerApiRequest.delete(customer.id)
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
                    count={filteredCustomer.length} // Tổng số sản phẩm
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <AddCustomer showCreate={showCreate} setShowCreate={setShowCreate} />
            <EditCustomer
                showEdit={showEdit}
                setShowEdit={setShowEdit}
                customerId={customerId}
                setCustomerId={setCustomerId}
            />
        </>
    )
}

export default withAuth(Customer)
