import api from "../api/axios";
import type { Claim, CreateClaimRequest } from "../types/claim";

class ClaimsService {
  async getClaims(): Promise<Claim[]> {
    const response = await api.get<Claim[]>("/claims");
    return response.data;
  }

  async getClaim(id: string): Promise<Claim> {
    const response = await api.get<Claim>(`/claims/${id}`);
    return response.data;
  }

  async createClaim(data: CreateClaimRequest): Promise<Claim> {
    const response = await api.post<Claim>("/claims", data);
    return response.data;
  }
}

export default new ClaimsService();
