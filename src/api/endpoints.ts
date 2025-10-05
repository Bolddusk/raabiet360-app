export const BASE_URL = 'https://api-raabiet360.shasltd.com/api/';
// export const BASE_URL = 'http://192.168.217.194:3000/api/';

export const API_ENDPOINT = {
  LOGIN: 'v1/auth/login',
  REPORT_CHECKIN_ISSUE: 'v1/attendance/report-issue',
  LOGOUT: 'v1/auth/logout',
  updateUser: (userId: number | string | null) => `v1/users/${userId}`,
  updatePassword: (userId: number | string | null) =>
    `v1/users/${userId}/password`,
  PROJECTS: (status?: string, page: number = 1, limit: number = 10) => {
    const queryParams = new URLSearchParams();
    if (status) queryParams.append('status', status);
    queryParams.append('page', page.toString());
    queryParams.append('limit', limit.toString());
    return `v1/enhanced-projects?${queryParams.toString()}`;
  },
  PROJECT_FILTERS: 'v1/enhanced-projects/filters',
  // Stock Request endpoints
  STOCK_REQUESTS: (params?: {
    status?: string;
    driver_id?: number;
    request_type?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.driver_id)
      queryParams.append('driver_id', params.driver_id.toString());
    if (params?.request_type)
      queryParams.append('request_type', params.request_type);
    if (params?.search) queryParams.append('search', params.search);
    queryParams.append('page', (params?.page || 1).toString());
    queryParams.append('limit', (params?.limit || 10).toString());
    return `v1/stocks/requests?${queryParams.toString()}`;
  },
  DRIVER_STOCK_REQUESTS: (
    driverId: number,
    params?: {
      status?: string;
      page?: number;
      limit?: number;
    },
  ) => {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    queryParams.append('page', (params?.page || 1).toString());
    queryParams.append('limit', (params?.limit || 10).toString());
    return `v1/stocks/requests/driver/${driverId}?${queryParams.toString()}`;
  },
  UPDATE_STOCK_REQUEST_STATUS: (requestId: number) =>
    `v1/stocks/requests/${requestId}/status`,
  // Item-specific status update endpoints (like web frontend)
  UPDATE_STOCK_REQUEST_ITEM_STATUS: (requestId: number, itemId: number) =>
    `v1/stocks/requests/${requestId}/items/${itemId}/status`,
  UPDATE_REPLENISHMENT_ITEM_STATUS: (replenishmentId: number, itemId: number) =>
    `v1/stocks/replenishments/${replenishmentId}/items/${itemId}/status`,
  STOCK_REQUEST_DETAILS: (requestId: number) =>
    `v1/stocks/requests/${requestId}/details`,
  STOCK_REPLENISHMENT_DETAILS: (replenishmentId: number) =>
    `v1/stocks/replenishments/${replenishmentId}`,
  CREATE_STOCK_REQUEST: 'v1/stocks/requests',
  STOCK_ITEMS_BY_WAREHOUSE: (warehouseId: number) =>
    `v1/stocks/items/stock?warehouse_id=${warehouseId}`,
  // Attendance endpoints
  ATTENDANCE_CHECK_IN: 'v1/attendance/check-in',
  ATTENDANCE_CHECK_OUT: 'v1/attendance/check-out',
  ATTENDANCE_MY_ATTENDANCE: (params?: {
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
  }) => {
    const queryParams = new URLSearchParams();
    if (params?.date) queryParams.append('date', params.date);
    if (params?.dateFrom) queryParams.append('dateFrom', params.dateFrom);
    if (params?.dateTo) queryParams.append('dateTo', params.dateTo);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.project_id) queryParams.append('project_id', params.project_id.toString());
    if (params?.project_name) queryParams.append('project_name', params.project_name);
    if (params?.sort_by) queryParams.append('sort_by', params.sort_by);
    if (params?.sort_order) queryParams.append('sort_order', params.sort_order);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    return `v1/attendance/my-attendance?${queryParams.toString()}`;
  },
  ATTENDANCE_TODAY_STATUS: 'v1/attendance/today-status',
  // Pickup Request endpoints
  CREATE_PICKUP_REQUEST: 'v1/pickup-requests',
  WORKER_PICKUP_REQUESTS: (page: number = 1, limit: number = 10) =>
    `v1/pickup-requests/my-requests?page=${page}&limit=${limit}`,
  DRIVER_PICKUP_REQUESTS: (page: number = 1, limit: number = 10) =>
    `v1/pickup-requests/assigned-to-me?page=${page}&limit=${limit}`,
  WORKER_PICKUP_REQUEST_BY_ID: (id: number) =>
    `v1/pickup-requests/my-requests/${id}`,
  DRIVER_PICKUP_REQUEST_BY_ID: (id: number) =>
    `v1/pickup-requests/assigned-to-me/${id}`,
  UPDATE_PICKUP_REQUEST_STATUS: (id: number) =>
    `v1/pickup-requests/${id}/status`,
};
