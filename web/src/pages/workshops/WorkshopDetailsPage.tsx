import { Link, useNavigate, useParams } from "react-router-dom";
import workshopsService from "../../services/workshops.service";
import { useQuery } from "@tanstack/react-query";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

export default function WorkshopsPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    data: workshop,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["workshop", id],
    queryFn: () => workshopsService.getWorkshop(id!),
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error || !workshop) {
    return <Alert severity="error">Unable to load workshop details</Alert>;
  }

  return (
    <>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate("/workshops")}
        sx={{ mb: 2 }}
      >
        Back to Workshops
      </Button>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Workshop Details
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2">Name</Typography>
            <Typography>{workshop.name}</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2">Status</Typography>
            <Typography
              color={workshop.isActive ? "success.main" : "error.main"}
            >
              {workshop.isActive ? "Active" : "Inactive"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2">Address</Typography>
            <Typography>{workshop.address}</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2">City</Typography>
            <Typography>{workshop.city}</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2">State</Typography>
            <Typography>{workshop.state}</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2">Phone</Typography>
            <Typography>{workshop.phoneNumber}</Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="subtitle2">Email</Typography>
            <Typography>{workshop.email}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
