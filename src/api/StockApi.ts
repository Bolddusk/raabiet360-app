import { postData, getData, putData } from './AuthApi';
import { API_ENDPOINT } from './endpoints';

export interface StockRequestItem {
  item_id: number;
  item_code: string;
  item_name: string;
  category: string;
  quantity: number;
}

export interface CreateStockRequestData {
  project_id: number;
  project_name: string;
  warehouse_id: number;
  warehouse_name: string;
  driver_id: number;
  driver_name: string;
  request_date_time: string;
  status: string;
  priority: string;
  notes?: string;
  items: StockRequestItem[];
}

export interface StockItem {
  id: number;
  item_code: string;
  item_name: string;
  category?: string;
  quantity: number; // This is the current stock
  current_stock?: number; // Alternative field name
  min_threshold: number;
  warehouse_id?: number;
  location?: string;
  status?: string;
  last_updated?: string;
  entry_time?: string;
  entered_by?: string;
}

export interface StockItemsResponse {
  success: boolean;
  message: string;
  data: {
    stockItems: StockItem[];
    total: number;
    summary: {
      critical: number;
      low_stock: number;
      normal: number;
      overstocked: number;
    };
    statusLegend: any;
  };
}

export interface CreateStockRequestResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    request_id: string;
    project_id: number;
    project_name: string;
    warehouse_id: number;
    warehouse_name: string;
    driver_id: number;
    driver_name: string;
    request_date_time: string;
    status: string;
    priority: string;
    notes?: string;
    items: StockRequestItem[];
  };
}

export const StockApi = {
  /**
   * Create a new stock request
   */
  createStockRequest: async (
    requestData: CreateStockRequestData,
    accessToken: string
  ): Promise<CreateStockRequestResponse> => {
    
    return postData(API_ENDPOINT.CREATE_STOCK_REQUEST, requestData, accessToken);
  },

  /**
   * Get stock items by warehouse
   */
  getStockItemsByWarehouse: async (
    warehouseId: number,
    accessToken: string
  ): Promise<StockItemsResponse> => {
    return getData(API_ENDPOINT.STOCK_ITEMS_BY_WAREHOUSE(warehouseId), accessToken);
  },

  /**
   * Get stock requests created by a specific user
   */
  getCreatorStockRequests: async (
    creatorId: number,
    accessToken: string,
    limit: number = 100
  ): Promise<any> => {
    return getData(`v1/stocks/requests/creator/${creatorId}?limit=${limit}`, accessToken);
  },

  /**
   * Get all stock requests with filtering options
   */
  getStockRequests: async (
    params: {
      status?: string;
      driver_id?: number;
      request_type?: string;
      search?: string;
      page?: number;
      limit?: number;
    } = {},
    accessToken: string
  ): Promise<any> => {
    const queryParams = new URLSearchParams();
    if (params.status) queryParams.append('status', params.status);
    if (params.driver_id) queryParams.append('driver_id', params.driver_id.toString());
    if (params.request_type) queryParams.append('request_type', params.request_type);
    if (params.search) queryParams.append('search', params.search);
    queryParams.append('page', (params.page || 1).toString());
    queryParams.append('limit', (params.limit || 10).toString());
    
    return getData(`v1/stocks/requests?${queryParams.toString()}`, accessToken);
  },

  /**
   * Get stock request details by ID
   */
  getStockRequestDetails: async (
    requestId: number,
    accessToken: string
  ): Promise<any> => {
    return getData(`v1/stocks/requests/${requestId}/details`, accessToken);
  },

  /**
   * Get stock replenishment details by ID
   */
  getStockReplenishmentDetails: async (
    replenishmentId: number,
    accessToken: string
  ): Promise<any> => {
    return getData(`v1/stocks/replenishments/${replenishmentId}`, accessToken);
  },

  /**
   * Update stock request item status
   */
  updateStockRequestItemStatus: async (
    requestId: number,
    itemId: number,
    payload: any,
    accessToken: string
  ): Promise<any> => {
    console.log('📤 Stock Request API Payload:', payload);
    return putData(`v1/stocks/requests/${requestId}/items/${itemId}/status`, payload, accessToken);
  },

  /**
   * Update replenishment item status
   */
  updateReplenishmentItemStatus: async (
    replenishmentId: number,
    itemId: number,
    payload: any,
    accessToken: string
  ): Promise<any> => {
    console.log('📤 Stock Replenishment API Payload:', payload);
    return putData(`v1/stocks/replenishments/${replenishmentId}/items/${itemId}/status`, payload, accessToken);
  },
};

// Export individual functions for direct import
export const getStockRequests = StockApi.getStockRequests;
export const getStockRequestDetails = StockApi.getStockRequestDetails;
export const getStockReplenishmentDetails = StockApi.getStockReplenishmentDetails;
export const updateStockRequestItemStatus = StockApi.updateStockRequestItemStatus;
export const updateReplenishmentItemStatus = StockApi.updateReplenishmentItemStatus;