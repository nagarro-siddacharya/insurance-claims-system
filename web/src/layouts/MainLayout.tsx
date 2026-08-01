import {
  Box,
} from '@mui/material';

import { Outlet } from 'react-router-dom';

import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';

export default function MainLayout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />

      <Box sx={{ flex: 1 }}>
        <Header />

        <Box sx={{ p: 3, bgcolor: '#f8f9fa', minHeight: '100vh'}}
        //   p={3}
        //   bgcolor="#f8f9fa"
        //   minHeight="100vh"
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}