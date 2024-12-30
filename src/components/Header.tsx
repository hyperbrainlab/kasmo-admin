import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Container,
} from "@mui/material";
import { useState, MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "src/apis/user";

export default function Header() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: getUserProfile,
    select: (data) => data.data,
  });

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, p: 0, m: 0 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="h6" noWrap component="div">
              캐스모 어드민
            </Typography>
          </Link>

          {data && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body1" sx={{ mr: 2 }}>
                {data.name}
              </Typography>
              <IconButton onClick={handleMenuOpen} color="inherit">
                <Avatar alt={data.name} src={data.profileImageUrl} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
