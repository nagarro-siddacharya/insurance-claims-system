import { AppBar, Box, Toolbar, Typography } from "@mui/material";

import UserMenu from "./UserMenu";

export default function Header() {
  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Typography variant="h6">Insurance Claims System</Typography>

        <Box sx={{ flex: 1 }} />

        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}
