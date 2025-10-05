import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { notificationApi } from '@api';
import { useAuth } from './AuthProvider';

export interface Notification {
  id: number;
  sender_id?: number;
  receiver_id: number;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'system';
  is_read: boolean;
  data?: any;
  read_at?: string;
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  refreshNotifications: () => Promise<void>;
  markAsRead: (notificationId: string | number) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  clearNotifications: () => Promise<void>;
  getStats: () => Promise<any>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn, userInfo } = useAuth();

  const unreadCount = notifications.filter(
    notification => !notification.is_read,
  ).length;

  // Simple fetch notifications from API
  const fetchNotifications = useCallback(async (): Promise<Notification[]> => {
    try {
      console.log('🔔 Fetching notifications...');

      // Check if user is logged in before making API call
      if (!isLoggedIn) {
        console.log('🔔 User not logged in, skipping notification fetch');
        return [];
      }

      const response = await notificationApi.getNotifications({
        page: 1,
        limit: 50,
      });

      console.log('🔔 API Response:', response);

      if (response.success) {
        console.log(
          '🔔 Successfully fetched notifications:',
          response.data.notifications.length,
        );
        // Client-side filter to ensure only notifications for current user are shown
        const filteredNotifications = response.data.notifications.filter(
          notification => notification.receiver_id === userInfo?.id,
        );
        console.log(
          '🔔 Filtered notifications for current user:',
          filteredNotifications.length,
        );
        return filteredNotifications;
      }

      console.log('🔔 API returned success: false');
      return [];
    } catch (error: any) {
      console.error('🔔 Failed to fetch notifications:', error);
      console.error('🔔 Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url,
        method: error.config?.method,
      });
      return [];
    }
  }, [isLoggedIn, userInfo?.id]);

  const refreshNotifications = useCallback(async () => {
    console.log('🔔 refreshNotifications called');
    setIsLoading(true);
    
    try {
      const fetchedNotifications = await fetchNotifications();
      console.log('🔔 Setting notifications:', fetchedNotifications.length);
      setNotifications(fetchedNotifications);
    } catch (error) {
      console.error('🔔 Error in refreshNotifications:', error);
      // Set empty array as fallback
      setNotifications([]);
    } finally {
      setIsLoading(false);
    }
  }, [fetchNotifications]);

  const markAsRead = async (notificationId: string | number) => {
    try {
      await notificationApi.markAsRead(notificationId);
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === notificationId
            ? { ...notification, is_read: true }
            : notification,
        ),
      );
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
      // Still update UI optimistically
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === notificationId
            ? { ...notification, is_read: true }
            : notification,
        ),
      );
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationApi.markAllAsRead();
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, is_read: true })),
      );
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
      // Still update UI optimistically
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, is_read: true })),
      );
    }
  };

  const clearNotifications = async () => {
    try {
      await notificationApi.clearAllNotifications();
      setNotifications([]);
    } catch (error) {
      console.error('Failed to clear notifications:', error);
      // Still update UI optimistically
      setNotifications([]);
    }
  };

  const getStats = async () => {
    try {
      const response = await notificationApi.getStats();
      return response.data;
    } catch (error) {
      console.error('Failed to get notification stats:', error);
      throw error;
    }
  };

  // Load notifications on component mount and when login status changes
  useEffect(() => {
    console.log('🔔 Loading notifications...', { isLoggedIn });
    if (isLoggedIn) {
      refreshNotifications();
    } else {
      // Clear notifications when user logs out
      setNotifications([]);
    }
  }, [isLoggedIn, refreshNotifications]);

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    isLoading,
    refreshNotifications,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    getStats,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      'useNotifications must be used within a NotificationProvider',
    );
  }
  return context;
};
