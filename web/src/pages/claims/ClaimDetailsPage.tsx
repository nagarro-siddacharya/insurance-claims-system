import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import claimsService from "../../services/claims.service";
import { useQuery } from "@tanstack/react-query";
import ClaimStatusChip from "../../components/common/ClaimStatusChip";
import { ArrowBack } from "@mui/icons-material";
import ClaimDocuments from "../../components/documents/ClaimDocuments";

export default function ClaimDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: claim,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["claim", id],
    queryFn: () => claimsService.getClaim(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError || !claim) {
    return <Alert severity="error">Unable to load claim.</Alert>;
  }

  return (
    <Box>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate("/claims")}
        sx={{ mb: 2 }}
      >
        Back to Claims
      </Button>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Claim Details
      </Typography>

      <Paper sx={{ p: 3 }}>
        <>
          <Typography variant="h6" gutterBottom>
            General Information
          </Typography>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2">Claim Number</Typography>

              <Typography>{claim.claimNumber}</Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2">Status</Typography>

              <ClaimStatusChip status={claim.status} />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2">Incident Date</Typography>

              <Typography>
                {new Date(claim.incidentDate).toLocaleDateString()}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2">Incident Location</Typography>

              <Typography>{claim.incidentLocation}</Typography>
            </Grid>
          </Grid>
        </>
      </Paper>
      <Paper sx={{ p: 3, mt: 3 }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Description
          </Typography>

          <Typography>{claim.description}</Typography>
        </Box>
      </Paper>
      <ClaimDocuments claimId={claim.id} />
    </Box>
  );
}
