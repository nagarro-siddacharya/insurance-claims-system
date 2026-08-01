import api from "../api/axios";
import type { Document } from "../types/document";

const getDocuments = async (claimId: string): Promise<Document[]> => {
  const response = await api.get(`/documents/claim/${claimId}`);
  return response.data;
};

const uploadDocument = async (claimId: string, file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(`/documents/upload/${claimId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const getDocumentBlob = async (id: string) => {
  const response = await api.get(`/documents/${id}`, {
    responseType: "blob",
  });

  return response.data;
};

const deleteDocument = async (id: string) => {
  const response = await api.delete(`/documents/${id}`);
  return response.data;
}

export default {
  getDocuments,
  uploadDocument,
  getDocumentBlob,
  deleteDocument,
};
