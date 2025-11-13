import axios from "axios";

// Configuração da API
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

// Tipos
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  profileId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  id: string;
  name: string;
  description: string;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  profileId: string;
}

export interface UpdateUserStatusDto {
  isActive: boolean;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  profileId?: string;
}

// API de usuários
export const usersApi = {
  getAll: () => api.get<User[]>("/users"),
  getById: (id: string) => api.get<User>(`/users/${id}`),
  create: (data: CreateUserDto) => api.post<User>("/users", data),
  update: (id: string, data: UpdateUserDto) =>
    api.patch<User>(`/users/${id}`, data),
  delete: (id: string) => api.delete(`/users/${id}`),
  updateStatus: (id: string, data: UpdateUserStatusDto) =>
    api.patch<User>(`/users/${id}/status`, data),
};

// API de perfis
export const profilesApi = {
  getAll: () => api.get<Profile[]>("/profiles"),
  getById: (id: string) => api.get<Profile>(`/profiles/${id}`),
};
