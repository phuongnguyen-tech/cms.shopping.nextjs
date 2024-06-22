import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Container } from '@mui/material'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kouhaku | Learn NextJS',
  description: 'Phuong dap chai ',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Container>{children}</Container>
      </body>
    </html>
  )
}
