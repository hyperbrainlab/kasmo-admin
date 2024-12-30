import { Box, CssBaseline, Container, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const DRAWER_WIDTH = 240;

export default function Layout() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header />
      <Sidebar width={DRAWER_WIDTH} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          mt: 4,
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
