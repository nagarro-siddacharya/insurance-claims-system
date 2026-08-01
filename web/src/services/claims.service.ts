import api from "../api/axios";
import type { Claim, CreateClaimRequest } from "../types/claim";

const getClaims = async (): Promise<Claim[]> => {
    const response = await api.get<Claim[]>("/claims");
    return response.data;
  }

  const getClaim = async (id: string): Promise<Claim> => {
    const response = await api.get<Claim>(`/claims/${id}`);
    return response.data;
  }

  const createClaim = async (data: CreateClaimRequest): Promise<Claim> => {
    const response = await api.post<Claim>("/claims", data);
    return response.data;
  }

export default {
  getClaims,
  getClaim,
  createClaim,
};
