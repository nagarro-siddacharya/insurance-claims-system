import api from "../api/axios";
import type { LoginRequest, LoginResponse } from "../types/auth";

class AuthService {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>("/auth/login", data);
    return response.data;
  }

  saveToken(token: string) {
    localStorage.setItem("access_token", token);
  }

  getToken() {
    return localStorage.getItem("access_token");
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem("access_token");
  }
}

export default new AuthService();