import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Box,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  width: number;
}

const NAVIGATION_ITEMS = [
  { text: "전체 알림", path: "/notification" },
  { text: "유저", path: "/user" },
  { text: "게시글", path: "/post" },
  { text: "업체", path: "/company" },
  { text: "배너", path: "/banner" },
] as const;

export default function Sidebar({ width }: SidebarProps) {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto", mt: 4 }}>
        <List>
          {NAVIGATION_ITEMS.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname.startsWith(item.path)}
              >
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
