import api from "../api/axios";
import type { Workshop } from "../types/workshop";

const getWorkshops = async (): Promise<Workshop[]> => {
  const response = await api.get<Workshop[]>("/workshops");
  return response.data;
};

const getWorkshop = async (id: string): Promise<Workshop> => {
  const response = await api.get<Workshop>(`/workshops/${id}`);
  return response.data;
};

export default {
  getWorkshops,
  getWorkshop,
};
