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
import productApiRequest from '@/apiServices/product/route'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import AddProduct from '@/components/products/create'
import EditProduct from '@/components/products/update'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function Product() {
    const router = useRouter()
    // State và handler cho phân trang
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const [productId, setProductId] = useState<string>('')
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
    const { data, error, isLoading } = useSWR(`${baseUrl}/products`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    const filteredProdcuts = data.filter(
        (data: IProduct) =>
            data.name.toLowerCase().includes(filter) ||
            data.description!.toLowerCase().includes(filter),
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
                        Create Product
                    </Button>
                </div>
                <TableContainer sx={{ maxHeight: 540 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow className="uppercase ">
                                <TableCell className="font-medium">Banner</TableCell>
                                <TableCell className="font-medium">Name</TableCell>
                                <TableCell className="font-medium">Price</TableCell>
                                <TableCell className="font-medium">Quantity</TableCell>
                                <TableCell className="font-medium">CategoryId</TableCell>
                                <TableCell className="font-medium">Description</TableCell>
                                <TableCell className="font-medium">Created At</TableCell>
                                <TableCell className="font-medium">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredProdcuts
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Cắt danh sách sản phẩm theo trang
                                .map((prod: IProduct) => (
                                    <TableRow
                                        key={prod.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell className="w-[160px]">
                                            <img
                                                className="h-[100px]"
                                                src={`${prod.bannerUrl}`}
                                                alt={prod.name}
                                                loading="lazy"
                                            />
                                        </TableCell>
                                        <TableCell>{prod.name}</TableCell>
                                        <TableCell>{prod.price}</TableCell>
                                        <TableCell>{prod.quantity}</TableCell>
                                        <TableCell>{prod.categoryId}</TableCell>
                                        <TableCell>{prod.description}</TableCell>
                                        <TableCell>{prod.createdAt}</TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => router.push(`products/${prod.id}`)}
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
                                                    setProductId(prod.id)
                                                    setShowEdit(true)
                                                }}
                                                size="small">
                                                <BorderColorRoundedIcon />
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => productApiRequest.delete(prod.id)}
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
                    count={filteredProdcuts.length} // Tổng số sản phẩm
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <AddProduct showCreate={showCreate} setShowCreate={setShowCreate} />
            <EditProduct
                showEdit={showEdit}
                setShowEdit={setShowEdit}
                productId={productId}
                setProductId={setProductId}
            />
        </>
    )
}

export default Product
