export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Claim {
  id: string;
  claimNumber: string;
  customerId: string;

  title: string;
  description: string;

  incidentDate: string;
  incidentLocation: string;

  status: string;

  workshopId: string | null;

  createdAt: string;
  updatedAt: string;

  customer: Customer;
}

export interface CreateClaimRequest {
  title: string;
  description: string;
  incidentDate: string;
  incidentLocation: string;
}