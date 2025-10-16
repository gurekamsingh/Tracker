import type { Deadline, CreateDeadlineDto, UpdateDeadlineDto } from '@/types/deadline';

// Configure your backend API URL here
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('token');
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options?.headers,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login';
        throw new ApiError(response.status, 'Unauthorized');
      }
      throw new ApiError(response.status, `API Error: ${response.statusText}`);
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return undefined as T;
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new Error(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export const deadlineApi = {
  getAll: () => fetchApi<Deadline[]>('/deadlines'),
  
  getById: (id: string) => fetchApi<Deadline>(`/deadlines/${id}`),
  
  create: (data: CreateDeadlineDto) =>
    fetchApi<Deadline>('/deadlines', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  update: (id: string, data: UpdateDeadlineDto) =>
    fetchApi<Deadline>(`/deadlines/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  delete: (id: string) =>
    fetchApi<void>(`/deadlines/${id}`, {
      method: 'DELETE',
    }),
};
