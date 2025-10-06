import messaging from '@react-native-firebase/messaging';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { PermissionsAndroid } from 'react-native';

import { notificationApi } from '@api';
import { isIOS } from '@shared/utils/helpers';
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
  addNotificationToTop: (newNotification: any) => void;
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
  const { isLoggedIn, userInfo } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // const unreadCount = notificatioxqns.filter(
  //   notification => !notification.is_read,
  // ).length;

  useEffect(() => {
    if(isLoggedIn){
      requestNotificationPermission();
    }
  }, [isLoggedIn]);

  // Request notification permission and generate token
  const requestNotificationPermission = async () => {
    try {
      if (!isIOS()) {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        await generateToken();
      } else {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          await generateToken();
        } else {
          console.warn('Push permission not granted on iOS');
        }
      }
    } catch (err) {
      console.error('Error requesting permission:', err);
    }
  };

  //  Generate FCM token (after registering device)
  const generateToken = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();

      const token = await messaging().getToken();
      console.log('FCM Token:', token);

      // Send token to your backend API after generating
      if (userInfo?.id && token) {
        try {
          await notificationApi.saveUserToken({
            token: token,
          });
          console.log('Token successfully sent to API', token);
        } catch (apiError) {
          console.error('Failed to send token to API:', apiError);
        }
      }

      // Handle token refresh
      messaging().onTokenRefresh(async newToken => {
        console.log('Token refreshed:', newToken);

        if (userInfo?.id && newToken) {
          try {
            await notificationApi.saveUserToken({
              token: newToken,
            });
            console.log('✅ Refreshed token successfully sent to API');
          } catch (apiError) {
            console.error('❌ Failed to update refreshed token:', apiError);
          }
        }
      });

      return token;
    } catch (err) {
      console.error('Error generating FCM token:', err);
    }
  };

  // const incrementUnreadCount = useCallback(() => {
  //   setUnreadCount(prev => prev + 1);
  // }, []);

  const addNotificationToTop = useCallback((newNotification: any) => {
    setNotifications(prev => [newNotification, ...prev]);
    // setUnreadCount(prev => prev + 1);
  }, []);
  
  const removeFcmToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('Removing FCM Token:', token);
  
      await notificationApi.removeUserToken({
        token,
      });
  
      await messaging().deleteToken();
      console.log('FCM token removed successfully from device and backend');
    } catch (error) {
      console.error('Failed to remove FCM token:', error);
    }
  };

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
    console.log('refreshNotifications called');
    setIsLoading(true);
  
    try {
      const fetchedNotifications = await fetchNotifications();
      console.log('Setting notifications:', fetchedNotifications.length);
      setNotifications(fetchedNotifications);
  
      // Update unread count
      const unread = fetchedNotifications.filter(n => !n.is_read).length;
      setUnreadCount(unread);
    } catch (error) {
      console.error('Error in refreshNotifications:', error);
      setNotifications([]);
      setUnreadCount(0);
    } finally {
      setIsLoading(false);
    }
  }, [fetchNotifications]);
  

  const markAsRead = async (notificationId: string | number) => {
    try {
      await notificationApi.markAsRead(notificationId);
      setNotifications(prev => {
        const updated = prev.map(notification =>
          notification.id === notificationId
            ? { ...notification, is_read: true }
            : notification,
        );
  
        // Update unread count
        setUnreadCount(updated.filter(n => !n.is_read).length);
        return updated;
      });
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
      setNotifications(prev => {
        const updated = prev.map(notification =>
          notification.id === notificationId
            ? { ...notification, is_read: true }
            : notification,
        );
        setUnreadCount(updated.filter(n => !n.is_read).length);
        return updated;
      });
    }
  };
  

  const markAllAsRead = async () => {
    try {
      await notificationApi.markAllAsRead();
      setNotifications(prev => {
        const updated = prev.map(notification => ({ ...notification, is_read: true }));
        setUnreadCount(0);
        return updated;
      });
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
      setNotifications(prev => {
        const updated = prev.map(notification => ({ ...notification, is_read: true }));
        setUnreadCount(0);
        return updated;
      });
    }
  };
  

  const clearNotifications = async () => {
    try {
      console.log('🗑️ Calling backend clearAllNotifications API...');
      const response = await notificationApi.clearAllNotifications();
      console.log('🗑️ Backend response:', response);
      
      if (response.success) {
        console.log('✅ Backend successfully cleared notifications');
        setNotifications([]);
        setUnreadCount(0);
      } else {
        console.error('❌ Backend returned success: false');
        setNotifications([]);
        setUnreadCount(0);
      }
    } catch (error) {
      console.error('❌ Failed to clear notifications:', error);
      setNotifications([]);
      setUnreadCount(0);
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
    addNotificationToTop
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
