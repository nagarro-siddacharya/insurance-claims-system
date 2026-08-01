import { Box, Divider, Typography } from "@mui/material";

import AppMenu from "./AppMenu";

export default function Sidebar() {
  return (
    <Box sx={{ width: 260, height: '100vh', borderRight: '1px solid #ddd' }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          ICS
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Insurance Claims
        </Typography>
      </Box>

      <Divider />

      <AppMenu />
    </Box>
  );
}
