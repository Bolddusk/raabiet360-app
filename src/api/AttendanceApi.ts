import { postData, getData } from './AuthApi';
import { API_ENDPOINT } from './endpoints';

export interface CheckInRequest {
  project_id?: number;
  latitude?: number;
  longitude?: number;
  address?: string;
  notes?: string;
}

export interface CheckOutRequest {
  latitude?: number;
  longitude?: number;
  address?: string;
  notes?: string;
}

export interface AttendanceRecord {
  id: number;
  date: string;
  check_in_time: string | null;
  check_out_time: string | null;
  working_hours: number | null;
  overtime_hours: number | null;
  status: 'present' | 'absent' | 'late' | 'half_day' | 'leave' | 'holiday';
  check_in_address: string | null;
  check_out_address: string | null;
  notes: string | null;
  project: {
    id: number;
    project_id: string;
    name: string;
    description: string;
    status: string;
    urgency: string;
    start_date: string;
    planned_end_date: string;
  } | null;
}

export interface AttendanceResponse {
  data: AttendanceRecord[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  summary: {
    totalDays: number;
    presentDays: number;
    lateDays: number;
    totalHours: number;
  };
}

export interface TodayStatusResponse {
  checkedIn: boolean;
  checkedOut: boolean;
  status: string;
  checkInTime?: string;
  checkOutTime?: string;
  workingHours?: number;
  overtimeHours?: number;
  project?: {
    id: number;
    project_id: string;
    name: string;
    description: string;
    status: string;
    urgency: string;
    start_date: string;
    planned_end_date: string;
  } | null;
}

export const AttendanceApi = {
  /**
   * Check in to a project
   */
  checkIn: async (data: CheckInRequest): Promise<any> => {
    return postData(API_ENDPOINT.ATTENDANCE_CHECK_IN, data);
  },

  /**
   * Check out from current attendance
   */
  checkOut: async (data: CheckOutRequest): Promise<any> => {
    return postData(API_ENDPOINT.ATTENDANCE_CHECK_OUT, data);
  },

  /**
   * Get user's attendance records
   */
  getMyAttendance: async (params?: {
    date?: string;
    dateFrom?: string;
    dateTo?: string;
    status?: string;
    project_id?: number;
    project_name?: string;
    sort_by?: string;
    sort_order?: 'ASC' | 'DESC';
    page?: number;
    limit?: number;
  }): Promise<AttendanceResponse> => {
    const endpoint = API_ENDPOINT.ATTENDANCE_MY_ATTENDANCE(params);
    return getData(endpoint);
  },

  /**
   * Get today's attendance status
   */
  getTodayStatus: async (): Promise<TodayStatusResponse> => {
    return getData(API_ENDPOINT.ATTENDANCE_TODAY_STATUS);
  },
};
