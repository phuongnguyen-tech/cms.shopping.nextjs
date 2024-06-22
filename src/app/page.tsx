import { Box } from "@mui/material";
import LogoutButton from "./logoutUser/page";
import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kouhaku | Learn NextJS",
  description: "Phuong dap chai vl ",
};

function Page() {
  return (
    <body className={inter.className}>
      <Box component="section">
        <h2>Welcome, User!</h2>
        <LogoutButton />
      </Box>
    </body>
  );
}

export default Page;
