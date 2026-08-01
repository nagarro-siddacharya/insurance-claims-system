import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createClaimSchema,
  type CreateClaimFormData,
} from "../../validations/claim.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import claimsService from "../../services/claims.service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ClaimForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateClaimFormData>({
    resolver: zodResolver(createClaimSchema),
  });

  const onSubmit = (data: any) => {
    createClaimMutation.mutate({
      ...data,
      incidentDate: new Date(data.incidentDate).toISOString(),
    });
  };

  const createClaimMutation = useMutation({
    mutationFn: claimsService.createClaim,

    onSuccess: () => {
      reset();

      queryClient.invalidateQueries({
        queryKey: ["claims"],
      });

      setSnackbarOpen(true);

      setTimeout(() => {
        navigate("/claims");
      }, 1500);
    },
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 700,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5">New Insurance Claim</Typography>

      {createClaimMutation.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to create claim. Please try again.
        </Alert>
      )}

      <TextField
        label="Title"
        {...register("title")}
        fullWidth
        error={!!errors.title}
        helperText={errors.title?.message}
      />

      <TextField
        label="Incident Location"
        {...register("incidentLocation")}
        fullWidth
        error={!!errors.incidentLocation}
        helperText={errors.incidentLocation?.message}
      />

      <TextField
        label="Incident Date"
        type="date"
        {...register("incidentDate")}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        fullWidth
        error={!!errors.incidentDate}
        helperText={errors.incidentDate?.message}
      />

      <TextField
        label="Description"
        {...register("description")}
        error={!!errors.description}
        helperText={errors.description?.message}
        multiline
        rows={4}
        fullWidth
      />

      <Button variant="outlined" onClick={() => navigate("/claims")}>
        Cancel
      </Button>

      <Button
        type="submit"
        variant="contained"
        disabled={createClaimMutation.isPending}
      >
        {createClaimMutation.isPending ? "Submitting..." : "Submit Claim"}
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
        >
          Claim created successfully.
        </Alert>
      </Snackbar>
    </Box>
  );
}
