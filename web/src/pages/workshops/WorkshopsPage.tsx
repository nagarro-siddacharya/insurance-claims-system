import { useQuery } from "@tanstack/react-query";
import workshopsService from "../../services/workshops.service";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import type { Workshop } from "../../types/workshop";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

export default function WorkshopsPage() {
  const navigate = useNavigate();
  const {
    data: workshops,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["workshops"],
    queryFn: () => workshopsService.getWorkshops(),
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert severity="error">Unable to load workshops</Alert>;
  }

  const columns: GridColDef<Workshop>[] = [
    {
      field: "name",
      headerName: "Workshop",
      flex: 1.5,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "state",
      headerName: "State",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone",
      flex: 1.2,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.8,
    },
    {
      field: "isActive",
      headerName: "Status",
      flex: 0.8,
      renderCell: (params) =>
        params.value ? (
          <Typography color="success.main">Active</Typography>
        ) : (
          <Typography color="error.main">Inactive</Typography>
        ),
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h4">Workshops</Typography>

        <Button variant="contained">Create Workshop</Button>
      </Box>

      <Box sx={{ height: 600 }}>
        <DataGrid
          rows={workshops ?? []}
          columns={columns}
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10]}
          onRowClick={(params) => navigate(`/workshops/${params.row.id}`)}
        />
      </Box>
    </Box>
  );
}
