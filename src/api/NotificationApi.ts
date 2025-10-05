import { axiosInstance } from '@providers';
import { Notification } from '@providers/NotificationProvider';
import { API_ENDPOINT } from './endpoints';

export interface NotificationApiResponse {
  success: boolean;
  data: {
    notifications: Notification[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message?: string;
}

export interface MarkAsReadRequest {
  notificationId: string;
}

export interface MarkAllAsReadRequest {
  userId: string;
}

export interface ClearNotificationsRequest {
  userId: string;
}

class NotificationApi {
  /**
   * Fetch notifications for the current user
   */
  async getNotifications(params?: {
    page?: number;
    limit?: number;
    is_read?: boolean;
    type?: string;
  }): Promise<NotificationApiResponse> {
    try {
      const endpoint = API_ENDPOINT.NOTIFICATIONS(params);
      console.log('🔔 Fetching notifications from:', endpoint);
      console.log('🔔 Full URL will be:', `${axiosInstance.defaults.baseURL}${endpoint}`);
      
      const response = await axiosInstance.get(endpoint);
      console.log('🔔 Notifications fetched successfully:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('🔔 Failed to fetch notifications:', error);
      console.error('🔔 Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url,
        method: error.config?.method,
        baseURL: axiosInstance.defaults.baseURL
      });
      throw new Error(error.response?.data?.message || 'Failed to fetch notifications');
    }
  }

  /**
   * Mark a specific notification as read
   */
  async markAsRead(notificationId: string | number): Promise<{ success: boolean; message?: string }> {
    try {
      const endpoint = API_ENDPOINT.NOTIFICATION_MARK_AS_READ(notificationId.toString());
      const response = await axiosInstance.patch(endpoint);
      return response.data;
    } catch (error: any) {
      console.error('Failed to mark notification as read:', error);
      throw new Error(error.response?.data?.message || 'Failed to mark notification as read');
    }
  }

  /**
   * Mark all notifications as read for the current user
   */
  async markAllAsRead(): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await axiosInstance.patch(API_ENDPOINT.NOTIFICATION_MARK_ALL_AS_READ);
      return response.data;
    } catch (error: any) {
      console.error('Failed to mark all notifications as read:', error);
      throw new Error(error.response?.data?.message || 'Failed to mark all notifications as read');
    }
  }

  /**
   * Clear all notifications for the current user
   */
  async clearAllNotifications(): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await axiosInstance.delete(API_ENDPOINT.NOTIFICATION_CLEAR_ALL);
      return response.data;
    } catch (error: any) {
      console.error('Failed to clear notifications:', error);
      throw new Error(error.response?.data?.message || 'Failed to clear notifications');
    }
  }

  /**
   * Get unread notification count
   */
  async getUnreadCount(): Promise<{ success: boolean; data: { count: number } }> {
    try {
      const response = await axiosInstance.get(API_ENDPOINT.NOTIFICATION_UNREAD_COUNT);
      return response.data;
    } catch (error: any) {
      console.error('Failed to get unread count:', error);
      throw new Error(error.response?.data?.message || 'Failed to get unread count');
    }
  }

  /**
   * Get notification statistics for the current user
   */
  async getStats(): Promise<{ success: boolean; data: { total: number; unread: number; read: number; byType: Record<string, number> } }> {
    try {
      const response = await axiosInstance.get(API_ENDPOINT.NOTIFICATION_STATS);
      return response.data;
    } catch (error: any) {
      console.error('Failed to get notification stats:', error);
      throw new Error(error.response?.data?.message || 'Failed to get notification stats');
    }
  }

  /**
   * Create a new notification (for internal use)
   */
  async createNotification(notificationData: {
    receiverId: number;
    senderId?: number;
    title: string;
    message: string;
    type?: 'info' | 'success' | 'warning' | 'error' | 'system';
    expiresAt?: string;
  }): Promise<{ success: boolean; message?: string; data?: { notification: any } }> {
    try {
      const response = await axiosInstance.post(API_ENDPOINT.NOTIFICATION_CREATE, notificationData);
      return response.data;
    } catch (error: any) {
      console.error('Failed to create notification:', error);
      throw new Error(error.response?.data?.message || 'Failed to create notification');
    }
  }

}

export const notificationApi = new NotificationApi();
