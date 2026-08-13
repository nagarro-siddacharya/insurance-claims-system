import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import workshopsService from "../../services/workshops.service";
import claimsService from "../../services/claims.service";

interface Props {
  open: boolean;
  claimId: string;
  onClose: () => void;
}

export default function AssignWorkshopDialog({
  open,
  claimId,
  onClose,
}: Props) {
  const [selectedWorkshop, setSelectedWorkshop] = useState("");
  const queryClient = useQueryClient();

  const {
    data: workshops = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["workshops"],
    queryFn: workshopsService.getWorkshops,
    enabled: open,
  });

  const assignMutation = useMutation({
    mutationFn: () => claimsService.assignWorkshop(claimId, selectedWorkshop),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["claim", claimId],
      });

      onClose();
    },
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Assign Workshop</DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <FormControl fullWidth>
            <InputLabel>Workshop</InputLabel>

            <Select
              value={selectedWorkshop}
              label="Workshop"
              onChange={(e) => setSelectedWorkshop(e.target.value)}
            >
              {workshops.map((workshop) => (
                <MenuItem key={workshop.id} value={workshop.id}>
                  {workshop.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button
          variant="contained"
          disabled={!selectedWorkshop || assignMutation.isPending}
          onClick={() => assignMutation.mutate()}
        >
          Assign
        </Button>
      </DialogActions>
    </Dialog>
  );
}
