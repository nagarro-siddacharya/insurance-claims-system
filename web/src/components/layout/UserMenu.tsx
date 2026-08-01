import { Avatar, Box, Button, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

import authService from "../../services/auth.service";

export default function UserMenu() {
  const navigate = useNavigate();

  function logout() {
    authService.logout();
    navigate("/login");
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Avatar>S</Avatar>

      <Typography>User</Typography>

      <Button color="inherit" onClick={logout}>
        Logout
      </Button>
    </Box>
  );
}
