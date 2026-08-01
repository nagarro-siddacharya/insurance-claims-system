import { Chip } from "@mui/material";

interface ClaimStatusChipProps {
  status: string;
}

const statusConfig: Record<
  string,
  {
    label: string;
    color:
      | "default"
      | "primary"
      | "secondary"
      | "success"
      | "error"
      | "info"
      | "warning";
  }
> = {
  SUBMITTED: {
    label: "Submitted",
    color: "warning",
  },
  UNDER_REVIEW: {
    label: "Under Review",
    color: "info",
  },
  APPROVED: {
    label: "Approved",
    color: "success",
  },
  REJECTED: {
    label: "Rejected",
    color: "error",
  },
  COMPLETED: {
    label: "Completed",
    color: "primary",
  },
};

export default function ClaimStatusChip({ status }: ClaimStatusChipProps) {
  const config = statusConfig[status] || {
    label: status,
    color: "default" as const,
  };
  return (
    <Chip
      label={config.label}
      color={config.color}
      size="small"
      variant="filled"
    />
  );
}
