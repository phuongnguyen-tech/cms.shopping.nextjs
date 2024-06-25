'use client'

import React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useRouter } from 'next/navigation'
import LogoutButton from '../logout/page'
import { Category, LocalMall, Person, ShoppingBasket, ShoppingCart } from '@mui/icons-material'

const drawerWidth = 240

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    function handleChangePage(link: string) {
        router.push(`/admin/${link}`)
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar className="flex justify-between">
                    <Typography variant="h6" noWrap component="div">
                        Phuong dap chai
                    </Typography>
                    <LogoutButton />
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}>
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {[
                            { text: 'products', icon: <LocalMall /> },
                            { text: 'customers', icon: <Person /> },
                            { text: 'categories', icon: <Category /> },
                            { text: 'orders', icon: <ShoppingCart /> },
                            { text: 'orderDetails', icon: <ShoppingBasket /> },
                        ].map((item, index) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton onClick={() => handleChangePage(item.text)}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText className="capitalize" primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </Box>
            </Drawer>
            <Box component="section" sx={{ marginTop: 8, marginLeft: 32 }}>
                {children}
            </Box>
        </Box>
    )
}
