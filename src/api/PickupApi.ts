import { API_ENDPOINT, getData, postData, patchData } from './api';

// Types for pickup requests
export interface CreatePickupRequestDto {
  project_id: number;
  pickup_time: string;
  pickup_date: string;
  destination: string;
  description?: string;
}

export interface UpdatePickupRequestStatusDto {
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  drop_off_time?: string;
  vehicle_number?: string;
  vehicle_color?: string;
}

export interface PickupRequest {
  id: number;
  worker_id: number;
  project_id: number;
  driver_id: number;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  pickup_time: string;
  pickup_date: string;
  destination: string;
  description?: string;
  drop_off_time?: string;
  vehicle_number?: string;
  vehicle_color?: string;
  created_at: string;
  updated_at: string;
  worker: {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    phone?: string;
    mobile?: string;
  };
  driver: {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    phone?: string;
    mobile?: string;
    vehicle_number?: string;
    vehicle_color?: string;
    vehicle_model?: string;
  };
  project: {
    id: number;
    project_id: string;
    name: string;
    description?: string;
    address?: string;
  };
}

export interface PickupRequestsResponse {
  success: boolean;
  message: string;
  data: {
    requests: PickupRequest[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      total_pages: number;
    };
  };
}

export interface PickupRequestResponse {
  success: boolean;
  message: string;
  data: PickupRequest;
}

// API Functions
export const createPickupRequest = async (data: CreatePickupRequestDto): Promise<PickupRequestResponse> => {
  return postData(API_ENDPOINT.CREATE_PICKUP_REQUEST, data);
};

export const getWorkerPickupRequests = async (page: number = 1, limit: number = 10): Promise<PickupRequestsResponse> => {
  return getData(API_ENDPOINT.WORKER_PICKUP_REQUESTS(page, limit));
};

export const getDriverPickupRequests = async (page: number = 1, limit: number = 10): Promise<PickupRequestsResponse> => {
  return getData(API_ENDPOINT.DRIVER_PICKUP_REQUESTS(page, limit));
};

export const getWorkerPickupRequestById = async (id: number): Promise<PickupRequestResponse> => {
  return getData(API_ENDPOINT.WORKER_PICKUP_REQUEST_BY_ID(id));
};

export const getDriverPickupRequestById = async (id: number): Promise<PickupRequestResponse> => {
  return getData(API_ENDPOINT.DRIVER_PICKUP_REQUEST_BY_ID(id));
};

export const updatePickupRequestStatus = async (id: number, data: UpdatePickupRequestStatusDto): Promise<PickupRequestResponse> => {
  return patchData(API_ENDPOINT.UPDATE_PICKUP_REQUEST_STATUS(id), data);
};
